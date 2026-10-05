const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables (.env in server/ or sangrillagroup/.env)
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { handlePostContact, handleCheckContact } = require('./contactsController');

const app = express();

/**
 * Validates whether an incoming origin is permitted.
 * Allows production site, all localhost ports, and GitHub Pages.
 */
function isOriginAllowed(origin) {
  if (!origin) return true;

  // Allow all localhost / 127.0.0.1 on any port (5173, 5174, 3000, etc.)
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return true;
  }

  // Allow production domains
  if (
    origin === 'https://www.sangrillagroup.com' ||
    origin === 'https://sangrillagroup.com'
  ) {
    return true;
  }

  // Allow GitHub Pages (*.github.io)
  if (/^https:\/\/[a-zA-Z0-9-]+\.github\.io$/.test(origin)) {
    return true;
  }

  // Allow Vercel preview domains
  if (/^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) {
    return true;
  }

  // Allow Netlify preview domains
  if (/^https:\/\/[a-zA-Z0-9-]+\.netlify\.app$/.test(origin)) {
    return true;
  }

  // Check custom allowed origins from environment variable
  if (process.env.ALLOWED_ORIGINS) {
    const list = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    if (list.includes(origin) || list.includes('*')) {
      return true;
    }
  }

  return false;
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
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
  app.listen(PORT, () => {
    console.log(`[Sangrilla API] Server is listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
