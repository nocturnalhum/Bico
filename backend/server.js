require('dotenv').config();
const PORT = process.env.PORT || 5050;
const {
  notFoundErrorHandling,
  errorHandling,
} = require('./middleware/errorHandling');
const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth');
const bikeRoute = require('./routes/bike');
const privateRoute = require('./routes/private');

// ============================================================================
// =================<<< Mongo DB Connect >>>===================================
// ============================================================================

const mongoose = require('mongoose');
const ConnectDB = require('./config/database');
ConnectDB();

// ============================================================================
// =================<<< Middleware >>>=========================================
// ============================================================================
app.use(cors(), express.json(), express.urlencoded({ extended: false }));

// ============================================================================
// =================<<< API Routes >>>=========================================
// ============================================================================

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/bike', bikeRoute);
app.use('/api/v1/private', privateRoute);

// ============================================================================
// =================<<< ErrorHandling >>>======================================
// ============================================================================

// Errorhandler should be last piece of middleware:
app.use(notFoundErrorHandling, errorHandling);

// ============================================================================
// =================<<< Server >>>=============================================
// ============================================================================

const server = app.listen(PORT, console.log(`Server running on port: ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
