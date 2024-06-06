import express from 'express';
import dotenv from 'dotenv';
import { getHelps } from './api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/helps', async (req, res) => {
  try {
    const helps = await getHelps();
    res.json(helps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
