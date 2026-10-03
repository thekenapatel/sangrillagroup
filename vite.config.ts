import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { MongoClient } from 'mongodb';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mongoUri =
    env.VITE_MONGODB_URI ||
    env.MONGODB_URI ||
    'mongodb+srv://sangrillagroup_db_user:jHTBPs86IPvK9Vxu@cluster0.087gxna.mongodb.net';
  const dbName = env.VITE_MONGODB_DATABASE || env.MONGODB_DATABASE || 'UserInfo';
  const collectionName =
    env.VITE_MONGODB_COLLECTION || env.MONGODB_COLLECTION || 'ContactDetails';

  let client: MongoClient | null = null;
  async function getDbCollection() {
    if (!client) {
      client = new MongoClient(mongoUri);
      await client.connect();
    }
    return client.db(dbName).collection(collectionName);
  }

  // Middleware handler for handling direct MongoDB operations from frontend
  const handleMongoRequest = async (req: any, res: any, next: any) => {
    const url = req.url ? req.url.split('?')[0] : '';
    if (url === '/api/contacts' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json');
        try {
          const data = JSON.parse(body || '{}');
          const { name, contactNumber, email, source, project } = data;

          if (!contactNumber) {
            res.statusCode = 400;
            res.end(
              JSON.stringify({ success: false, error: 'Contact number is required' })
            );
            return;
          }

          const cleanPhone = String(contactNumber).replace(/\D/g, '');
          const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;
          const collection = await getDbCollection();

          // Avoid duplicate entries: check if this contactNumber already exists in UserInfo.ContactDetails
          const existing = await collection.findOne({
            $or: [
              { contactNumber: String(contactNumber).trim() },
              { contactNumber: cleanPhone },
              ...(last10.length >= 10 ? [{ contactNumber: { $regex: last10 + '$' } }] : [])
            ]
          });

          if (existing) {
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                isDuplicate: true,
                message: 'Contact already exists in database',
                data: {
                  id: existing._id,
                  name: existing.name,
                  contactNumber: existing.contactNumber
                }
              })
            );
            return;
          }

          // Insert new contact record into UserInfo.ContactDetails
          const newDoc = {
            name: (name || '').trim(),
            contactNumber: String(contactNumber).trim(),
            email: (email || '').trim(),
            source: source || 'Brochure Download',
            project: project || 'Sangrilla Meadows',
            createdAt: new Date()
          };

          try {
            const result = await collection.insertOne(newDoc);

            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                isDuplicate: false,
                message: 'Saved to MongoDB UserInfo.ContactDetails successfully',
                data: {
                  id: result.insertedId,
                  name: newDoc.name,
                  contactNumber: newDoc.contactNumber
                }
              })
            );
          } catch (insertErr: any) {
            // Check for MongoDB unique constraint violation (duplicate key error)
            if (insertErr.code === 11000) {
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  isDuplicate: true,
                  message: 'Contact already exists in database',
                  data: {
                    name: newDoc.name,
                    contactNumber: newDoc.contactNumber
                  }
                })
              );
              return;
            }
            throw insertErr;
          }
        } catch (err: any) {
          console.error('[MongoDB Atlas Direct Handler] Error:', err);
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              success: false,
              error: err.message || 'Failed to save contact'
            })
          );
        }
      });
      return;
    }

    if (url === '/api/contacts/check' && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      try {
        const fullUrl = new URL(req.url, 'http://localhost');
        const phone = fullUrl.searchParams.get('phone');
        if (!phone) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Phone parameter required' }));
          return;
        }

        const cleanPhone = phone.replace(/\D/g, '');
        const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;
        const collection = await getDbCollection();
        const existing = await collection.findOne({
          $or: [
            { contactNumber: phone.trim() },
            { contactNumber: cleanPhone },
            ...(last10.length >= 10 ? [{ contactNumber: { $regex: last10 + '$' } }] : [])
          ]
        });

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            success: true,
            isDuplicate: !!existing
          })
        );
      } catch (err: any) {
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    next();
  };

  const mongoFrontendPlugin = {
    name: 'vite-plugin-mongo-frontend',
    configureServer(server: any) {
      server.middlewares.use(handleMongoRequest);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(handleMongoRequest);
    }
  };

  return {
    plugins: [react(), tailwindcss(), mongoFrontendPlugin],
    base: '/'
  };
});
