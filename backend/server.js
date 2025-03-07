require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.get('/api/capacity', async (req, res) => {
  const { min, max } = req.query;
  if (!min || !max || isNaN(min) || isNaN(max)) {
    return res.status(400).json({ error: 'Please provide valid min and max values' });
  }
  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute(
      'SELECT name, weekend_price FROM venue WHERE capacity BETWEEN ? AND ? AND licensed = 1',
      [min, max]
    );
    await db.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));