import express from 'express';
require('dotenv').config();

const app = express();
app.use(express.json()); //json middleware

app.listen(process.env.PORT, () => {
  console.log(`running on http://localhost:${process.env.PORT}/`);
});
