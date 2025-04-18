const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
import { pool } from './modeles/User'; 

dotenv.config();

pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL:', err.message);
  });

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
