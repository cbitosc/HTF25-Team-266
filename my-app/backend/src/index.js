const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/wallet');
const explorerRoutes = require('./routes/explorer');
const migrationRoutes = require('./routes/migration');
const docsRoutes = require('./routes/docs');
const dashboardRoutes = require('./routes/dashboard');
const cryptoRoutes = require('./routes/crypto');
const evalRoutes = require('./routes/eval');

const app = express();
const PORT = process.env.PORT || 4000;

// Allow the Next.js frontend running on localhost:3000 to call these APIs
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'My-App backend is running' }));

app.use('/api/wallet', walletRoutes);
app.use('/api/explorer', explorerRoutes);
app.use('/api/migration', migrationRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/crypto', cryptoRoutes);
app.use('/api/eval', evalRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

function startServer(port) {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on http://0.0.0.0:${port}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${port} in use, trying ${port + 1}...`);
      setTimeout(() => startServer(port + 1), 500);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  return server;
}

if (require.main === module) {
  startServer(Number(process.env.PORT || PORT));
}

module.exports = { app, startServer };
