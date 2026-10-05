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
    const collection = cachedDb.collection(collectionName);
    return { client: cachedClient, db: cachedDb, collection };
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  });

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
        // Non-critical: index might already exist or collection has existing duplicates
        console.warn('[MongoDB] Index notice:', err.message);
      });
  }

  return { client, db, collection };
}

module.exports = { connectToDatabase };
