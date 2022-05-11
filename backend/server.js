require('dotenv').config();
const PORT = process.env.PORT || 5050;
const errorHandling = require('./middleware/errorHandling');
const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

// ============================================================================
// =================<<< Mongo DB Connect >>>===================================
// ============================================================================

const mongoose = require('mongoose');
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

// ============================================================================
// =================<<< ErrorHandling >>>======================================
// ============================================================================

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
