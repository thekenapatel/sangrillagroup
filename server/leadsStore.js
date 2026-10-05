const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../server/data');
const DATA_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function getStoredContacts() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.warn('[LeadsStore] Read error:', err.message);
    return [];
  }
}

function saveContactLocally(contact) {
  ensureDataFile();
  try {
    const list = getStoredContacts();
    const cleanPhone = String(contact.contactNumber || '').replace(/\D/g, '');
    const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

    // Check duplicate in local store
    const existing = list.find((c) => {
      const cPhone = String(c.contactNumber || '').replace(/\D/g, '');
      const cLast10 = cPhone.length >= 10 ? cPhone.slice(-10) : cPhone;
      return (
        cPhone === cleanPhone ||
        (last10.length >= 10 && (cPhone.endsWith(last10) || cLast10 === last10))
      );
    });

    if (existing) {
      return { isDuplicate: true, contact: existing };
    }

    const record = {
      ...contact,
      _id: contact._id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: contact.createdAt || new Date().toISOString(),
      syncedToMongo: !!contact.syncedToMongo
    };

    list.push(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
    return { isDuplicate: false, contact: record };
  } catch (err) {
    console.error('[LeadsStore] Write error:', err.message);
    return { isDuplicate: false, contact };
  }
}

function markSyncedToMongo(phone) {
  ensureDataFile();
  try {
    const list = getStoredContacts();
    const cleanPhone = String(phone).replace(/\D/g, '');
    let updated = false;
    for (const item of list) {
      const cPhone = String(item.contactNumber || '').replace(/\D/g, '');
      if (cPhone === cleanPhone) {
        item.syncedToMongo = true;
        updated = true;
      }
    }
    if (updated) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('[LeadsStore] Update sync error:', err.message);
  }
}

module.exports = {
  getStoredContacts,
  saveContactLocally,
  markSyncedToMongo,
  DATA_FILE
};
