import { MongoClient } from 'mongodb';

// Cache client across serverless function invocations
let cachedClient: MongoClient | null = null;

async function getCollection() {
  const uri =
    process.env.MONGODB_URI ||
    process.env.VITE_MONGODB_URI ||
    'mongodb+srv://sangrillagroup_db_user:jHTBPs86IPvK9Vxu@cluster0.087gxna.mongodb.net';
  const dbName =
    process.env.MONGODB_DATABASE ||
    process.env.VITE_MONGODB_DATABASE ||
    'UserInfo';
  const collectionName =
    process.env.MONGODB_COLLECTION ||
    process.env.VITE_MONGODB_COLLECTION ||
    'ContactDetails';

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient.db(dbName).collection(collectionName);
}

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export const handler = async (event: any) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const collection = await getCollection();

    // GET /api/contacts/check?phone=...
    if (event.httpMethod === 'GET') {
      const phone = event.queryStringParameters?.phone;
      if (!phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Phone parameter required' }),
        };
      }

      const cleanPhone = String(phone).replace(/\D/g, '');
      const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

      const existing = await collection.findOne({
        $or: [
          { contactNumber: String(phone).trim() },
          { contactNumber: cleanPhone },
          ...(last10.length >= 10 ? [{ contactNumber: { $regex: last10 + '$' } }] : []),
        ],
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          isDuplicate: !!existing,
        }),
      };
    }

    // POST /api/contacts
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');
      const { name, contactNumber, email, source, project } = data;

      if (!contactNumber) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Contact number is required' }),
        };
      }

      const cleanPhone = String(contactNumber).replace(/\D/g, '');
      const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

      // Duplicate check
      const existing = await collection.findOne({
        $or: [
          { contactNumber: String(contactNumber).trim() },
          { contactNumber: cleanPhone },
          ...(last10.length >= 10 ? [{ contactNumber: { $regex: last10 + '$' } }] : []),
        ],
      });

      if (existing) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            isDuplicate: true,
            message: 'Contact already exists in database',
            data: {
              id: existing._id,
              name: existing.name,
              contactNumber: existing.contactNumber,
            },
          }),
        };
      }

      const newDoc = {
        name: (name || '').trim(),
        contactNumber: String(contactNumber).trim(),
        email: (email || '').trim(),
        source: source || 'Brochure Download',
        project: project || 'Sangrilla Meadows',
        createdAt: new Date(),
      };

      try {
        const result = await collection.insertOne(newDoc);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            isDuplicate: false,
            message: 'Saved to MongoDB UserInfo.ContactDetails successfully',
            data: {
              id: result.insertedId,
              name: newDoc.name,
              contactNumber: newDoc.contactNumber,
            },
          }),
        };
      } catch (insertErr: any) {
        if (insertErr.code === 11000) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              isDuplicate: true,
              message: 'Contact already exists in database',
              data: {
                name: newDoc.name,
                contactNumber: newDoc.contactNumber,
              },
            }),
          };
        }
        throw insertErr;
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  } catch (err: any) {
    console.error('[Netlify Function /contacts] Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: err.message || 'Internal Server Error',
      }),
    };
  }
};
