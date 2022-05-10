require('dotenv').config();
const PORT = process.env.PORT || 5050;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandling = require('./middleware/errorHandling');
const authRoute = require('./routes/auth');

// Connect to MongoDB:
const ConnectDB = require('./config/database');
ConnectDB();

// ============================================================================
// =================<<< Middleware >>>=========================================
// ============================================================================
app.use(express.json());

// ============================================================================
// =================<<< API Routes >>>=========================================
// ============================================================================

app.use('/api/v1/auth', authRoute);

// Errorhandler should be last piece of middleware:
app.use(errorHandling);
// ============================================================================
// =================<<< Server >>>=============================================
// ============================================================================

const server = app.listen(PORT, console.log(`Server running on port: ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
