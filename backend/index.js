const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});

app.use(express.json());
app.use('/user', authMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
