const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables (.env in server/ or sangrillagroup/.env)
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { handlePostContact, handleCheckContact, handleGetContacts } = require('./contactsController');

const app = express();

/**
 * Universal permissive CORS configuration for robust cross-origin access.
 * Allows frontend on GitHub Pages, custom domain, Vercel, Netlify, and local dev.
 */
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  })
);

app.use(express.json());

// Base informational endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sangrilla Group Backend API',
    endpoints: {
      getContacts: 'GET /api/contacts',
      postContacts: 'POST /api/contacts',
      checkContacts: 'GET /api/contacts/check?phone=XXXXXXXXXX',
      health: 'GET /health'
    }
  });
});

// Health check endpoint (for Render / Railway / monitoring)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Primary Contact Endpoints
app.get('/api/contacts', handleGetContacts);
app.post('/api/contacts', handlePostContact);
app.get('/api/contacts/check', handleCheckContact);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Sangrilla API] Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start HTTP server when executed directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Sangrilla API] Server is listening on port ${PORT}`);
});
}

module.exports = app;
