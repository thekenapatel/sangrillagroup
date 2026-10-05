import { MongoClient } from 'mongodb';

// Cache client across serverless function invocations
let cachedClient: MongoClient | null = null;

async function getCollection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DATABASE || 'UserInfo';
  const collectionName = process.env.MONGODB_COLLECTION || 'ContactDetails';

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    });
    await cachedClient.connect();
  }

  return cachedClient.db(dbName).collection(collectionName);
}

const allowedOrigins = [
  'https://www.sangrillagroup.com',
  'https://sangrillagroup.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(requestOrigin?: string) {
  const isAllowed =
    requestOrigin &&
    (allowedOrigins.includes(requestOrigin) ||
      /^https:\/\/[a-zA-Z0-9-]+\.github\.io$/.test(requestOrigin));

  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': isAllowed ? requestOrigin : 'https://www.sangrillagroup.com',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

export const handler = async (event: any) => {
  const origin = event.headers?.origin || event.headers?.Origin;
  const headers = getCorsHeaders(origin);

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
      if (cleanPhone.length < 10) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, isDuplicate: false }),
        };
      }

      const last10 = cleanPhone.slice(-10);
      const existing = await collection.findOne({
        $or: [
          { normalizedContactNumber: cleanPhone },
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

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Please enter your full name (at least 2 characters).' }),
        };
      }

      if (!contactNumber) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Contact number is required.' }),
        };
      }

      const cleanPhone = String(contactNumber).replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length < 10) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Please enter a valid 10-digit mobile number.' }),
        };
      }

      const last10 = cleanPhone.slice(-10);
      const existing = await collection.findOne({
        $or: [
          { normalizedContactNumber: cleanPhone },
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
            message: 'Contact already exists.',
            data: {
              id: existing._id,
              name: existing.name,
              contactNumber: existing.contactNumber,
            },
          }),
        };
      }

      const newDoc = {
        name: name.trim(),
        contactNumber: String(contactNumber).trim(),
        normalizedContactNumber: cleanPhone,
        email: (email || '').trim(),
        source: source || 'Brochure Modal Popup',
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
            message: 'Contact saved successfully.',
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
              message: 'Contact already exists.',
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
    console.error('[Netlify Function /contacts] Error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to process request. Please try again later.',
      }),
    };
  }
};
