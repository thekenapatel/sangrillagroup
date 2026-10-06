const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;
let indexEnsured = false;

/**
 * Connect to MongoDB Atlas using server-side environment variables.
 * Reuses MongoClient across invocations (connection pooling).
 */
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DATABASE || 'UserInfo';
  const collectionName = process.env.MONGODB_COLLECTION || 'ContactDetails';

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
  }

  if (cachedClient && cachedDb) {
    try {
      // Quick ping to check if existing connection is still healthy
      const collection = cachedDb.collection(collectionName);
      return { client: cachedClient, db: cachedDb, collection };
    } catch {
      cachedClient = null;
      cachedDb = null;
    }
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    cachedClient = client;
    cachedDb = db;

    // Ensure index on normalizedContactNumber in background
    if (!indexEnsured) {
      indexEnsured = true;
      collection
        .createIndex(
          { normalizedContactNumber: 1 },
          { unique: true, sparse: true, background: true }
        )
        .catch((err) => {
          console.warn('[MongoDB] Index notice:', err.message);
        });
    }

    return { client, db, collection };
  } catch (err) {
    cachedClient = null;
    cachedDb = null;
    if (err.message && (err.message.includes('SSL') || err.message.includes('alert'))) {
      console.error(
        '[MongoDB] Atlas Network Access Warning: IP address is not whitelisted in MongoDB Atlas. Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0).'
      );
    }
    throw err;
  }
}

module.exports = { connectToDatabase };
