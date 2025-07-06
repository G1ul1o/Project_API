require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const animeRoutes = require('./routes/animeRoutes');

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/', animeRoutes);


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`User Microservice running on port ${PORT}`);
});