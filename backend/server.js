const {
  notFoundErrorHandling,
  errorHandling,
} = require('./middleware/errorHandling');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/eventLogger');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const authRoute = require('./routes/auth');
const bikeRoute = require('./routes/bike');
const privateRoute = require('./routes/private');

// ============================================================================
// =================<<< Mongo DB Connect >>>===================================
// ============================================================================

const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const PORT = process.env.PORT || 5050;
dbConnect();

// ============================================================================
// =================<<< Middleware >>>=========================================
// ============================================================================

// Custom middleware logger:
app.use(logger);

// Handle options credentials check - before CORS
//  and fetch cookies credentials requirement:
app.use(credentials);

app.use(
  cors(),
  express.urlencoded({ extended: false }),
  express.json(),
  cookieParser()
);

// ============================================================================
// =================<<< API Routes >>>=========================================
// ============================================================================

// Routes:
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
