import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import db from './config/db.js'; // Import database connection

dotenv.config();
const app = express();
// express middlewares
app.use(cors());
app.use(express.json());

// Define routes
app.get('/', async (req, res) => res.send("express backend working"))
app.use('/employees', employeeRoutes);
app.use('/leaves', leaveRoutes);

const PORT = process.env.PORT || 5000;

// Check DB Connection before starting the server
db.getConnection()
  .then(connection => {
    console.log('✅ Database is connected. Starting server...');
    connection.release(); // Release connection back to pool

    // Start Express server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit if DB connection fails
  });
