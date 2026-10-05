const { connectToDatabase } = require('./db');
const { getStoredContacts, saveContactLocally, markSyncedToMongo } = require('./leadsStore');

/**
 * Normalizes a phone number by stripping all non-digit characters.
 */
function normalizePhone(phone) {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '');
}

/**
 * Sync unsynced local leads to MongoDB Atlas in the background
 */
async function syncLocalLeadsToMongo() {
  try {
    const list = getStoredContacts();
    const unsynced = list.filter((item) => !item.syncedToMongo);
    if (unsynced.length === 0) return;

    const { collection } = await connectToDatabase();
    for (const lead of unsynced) {
      const cleanPhone = normalizePhone(lead.contactNumber);
      const existing = await collection.findOne({
        $or: [
          { normalizedContactNumber: cleanPhone },
          { contactNumber: lead.contactNumber },
          { contactNumber: cleanPhone }
        ]
      });

      if (!existing) {
        await collection.insertOne({
          name: lead.name,
          contactNumber: lead.contactNumber,
          normalizedContactNumber: cleanPhone,
          email: lead.email || '',
          source: lead.source || 'Brochure Modal Popup',
          project: lead.project || 'Sangrilla Meadows',
          createdAt: new Date(lead.createdAt || Date.now())
        });
      }
      markSyncedToMongo(cleanPhone);
    }
  } catch (err) {
    // Atlas not reachable yet, will retry on next operation
  }
}

/**
 * POST /api/contacts
 * Validates lead submission and persists to MongoDB Atlas & local backup.
 * Prevents duplicate records by normalized contact number.
 */
async function handlePostContact(req, res) {
  try {
    const { name, contactNumber, email, source, project } = req.body || {};

    // 1. Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your full name (at least 2 characters).'
      });
    }

    // 2. Validate & Normalize Phone Number
    if (!contactNumber) {
      return res.status(400).json({
        success: false,
        error: 'Contact number is required.'
      });
    }

    const cleanPhone = normalizePhone(contactNumber);
    if (!cleanPhone || cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit mobile number.'
      });
    }

    const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

    // 3. Fast check duplicate in local persistent storage
    const localContacts = getStoredContacts();
    const localExisting = localContacts.find((c) => {
      const cp = normalizePhone(c.contactNumber);
      const clast10 = cp.length >= 10 ? cp.slice(-10) : cp;
      return cp === cleanPhone || (last10.length >= 10 && (cp.endsWith(last10) || clast10 === last10));
    });

    if (localExisting) {
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        message: 'Contact already exists.',
        data: {
          id: localExisting._id,
          name: localExisting.name,
          contactNumber: localExisting.contactNumber
        }
      });
    }

    const newDoc = {
      name: name.trim(),
      contactNumber: String(contactNumber).trim(),
      normalizedContactNumber: cleanPhone,
      email: (email || '').trim(),
      source: source || 'Brochure Modal Popup',
      project: project || 'Sangrilla Meadows',
      createdAt: new Date().toISOString()
    };

    // 4. Always save to local backup store first so lead is never lost
    const localResult = saveContactLocally(newDoc);
    if (localResult.isDuplicate) {
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        message: 'Contact already exists.',
        data: {
          id: localResult.contact._id,
          name: localResult.contact.name,
          contactNumber: localResult.contact.contactNumber
        }
      });
    }

    // 5. Connect and save to MongoDB Atlas
    try {
      const { collection } = await connectToDatabase();

      // Check if duplicate exists in MongoDB Atlas
      const mongoExisting = await collection.findOne({
        $or: [
          { normalizedContactNumber: cleanPhone },
          { contactNumber: String(contactNumber).trim() },
          { contactNumber: cleanPhone },
          ...(last10.length >= 10 ? [{ contactNumber: { $regex: last10 + '$' } }] : [])
        ]
      });

      if (mongoExisting) {
        markSyncedToMongo(cleanPhone);
        return res.status(200).json({
          success: true,
          isDuplicate: true,
          message: 'Contact already exists.',
          data: {
            id: mongoExisting._id,
            name: mongoExisting.name,
            contactNumber: mongoExisting.contactNumber
          }
        });
      }

      const mongoInsertDoc = {
        ...newDoc,
        createdAt: new Date(newDoc.createdAt)
      };

      const result = await collection.insertOne(mongoInsertDoc);
      markSyncedToMongo(cleanPhone);

      // Trigger background sync for any other pending leads
      syncLocalLeadsToMongo().catch(() => {});

      return res.status(200).json({
        success: true,
        isDuplicate: false,
        message: 'Contact saved successfully.',
        data: {
          id: result.insertedId,
          name: newDoc.name,
          contactNumber: newDoc.contactNumber
        }
      });
    } catch (dbErr) {
      // If MongoDB Atlas threw unique duplicate constraint (11000)
      if (dbErr.code === 11000) {
        markSyncedToMongo(cleanPhone);
        return res.status(200).json({
          success: true,
          isDuplicate: true,
          message: 'Contact already exists.',
          data: {
            name: newDoc.name,
            contactNumber: newDoc.contactNumber
          }
        });
      }

      console.log(
        `[Lead Capture] Lead saved: ${newDoc.name} (${newDoc.contactNumber}). Preserved in local storage (pending Atlas Network Access whitelist).`
      );

      return res.status(200).json({
        success: true,
        isDuplicate: false,
        message: 'Contact saved successfully.',
        data: {
          id: localResult.contact._id,
          name: newDoc.name,
          contactNumber: newDoc.contactNumber
        }
      });
    }
  } catch (err) {
    console.error('[Contacts API] Unexpected error in POST /api/contacts:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to save contact details. Please try again later.'
    });
  }
}

/**
 * GET /api/contacts/check?phone=...
 * Checks whether a phone number already exists in MongoDB or local backup.
 */
async function handleCheckContact(req, res) {
  try {
    const phone = req.query.phone;
    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Phone parameter is required.'
      });
    }

    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone || cleanPhone.length < 10) {
      return res.status(200).json({
        success: true,
        isDuplicate: false
      });
    }

    const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

    // Check local store
    const localContacts = getStoredContacts();
    const localExisting = localContacts.find((c) => {
      const cp = normalizePhone(c.contactNumber);
      const clast10 = cp.length >= 10 ? cp.slice(-10) : cp;
      return cp === cleanPhone || (last10.length >= 10 && (cp.endsWith(last10) || clast10 === last10));
    });

    if (localExisting) {
      return res.status(200).json({
        success: true,
        isDuplicate: true
      });
    }

    // Check MongoDB Atlas if available
    try {
      const { collection } = await connectToDatabase();
      const existing = await collection.findOne({
        $or: [
          { normalizedContactNumber: cleanPhone },
          { contactNumber: String(phone).trim() },
          { contactNumber: cleanPhone },
          ...(last10.length >= 10 ? [{ contactNumber: { $regex: last10 + '$' } }] : [])
        ]
      });

      return res.status(200).json({
        success: true,
        isDuplicate: !!existing
      });
    } catch {
      // Atlas temporarily unreachable, return local result
      return res.status(200).json({
        success: true,
        isDuplicate: false
      });
    }
  } catch (err) {
    console.error('[Contacts API] Error in GET /api/contacts/check:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify contact. Please try again later.'
    });
  }
}

module.exports = {
  handlePostContact,
  handleCheckContact,
  normalizePhone
};
