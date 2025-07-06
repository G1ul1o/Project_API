require('dotenv').config({ path: '../.env' });
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { generateToken } = require('../../Authentification/utils/jwt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.registerWithGoogle = async (req, res) => {
  try {
    const { credential, privileges, username } = req.body;

    if (!credential || !username) {
      return res.status(400).json({ message: "Missing credential or username" });
    }

    // Vérifier le token Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    user = new User({
      email,
      username,
      privileges,
      password_hash: '',
    });

    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user, token });

  } catch (error) {
    console.error("Erreur Google Register:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription Google" });
  }
};

exports.register = async (req, res) => {
  try {
    console.log("Request received")
    const { username, email, password, privileges} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password_hash, privileges});

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
  console.error('Erreur côté User Microservice:', err);
  res.status(500).json({ message: 'Server error' });
}
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginwithgoogle = async (req, res) => {
  const { googleToken } = req.body;
  if (!googleToken) {
    return res.status(400).json({ message: 'Google token is required' });
  }

  try {
   
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ message: 'Email not found in Google token' });
    }


    const user = await User.findOne({ email });

    if (!user) {
    
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    const token = generateToken(user);

    return res.status(200).json({ user, token });

  } catch (error) {
    console.error('Google login error:', error);
    return res.status(401).json({ message: 'Invalid Google token' });
  }
};