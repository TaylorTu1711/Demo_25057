import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from "../db.js";


const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashed]);
    res.status(201).json({ message: 'User registered' });
  } catch {
    res.status(400).json({ error: 'Email already in use' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET || 'secret_key', {
  expiresIn: '15m',
    }); 
  res.json({ token });
};

export const getCurrentUser = (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
};

// controllers/authController.js


export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(400).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];

    // Lưu token vào blacklist trong 15 phút (900 giây)


    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};
