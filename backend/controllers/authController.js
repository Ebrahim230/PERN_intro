const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database/db.js');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.json({ success: false, message: 'All fields are required.' });

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (existingUser.rows.length > 0) return res.json({ success: false, message: 'User already exists with this email.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await pool.query(
      'INSERT INTO users (name, email, password, token) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, token]
    );

    return res.json({ success: true, message: 'User registered successfully.', token });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: 'Server error.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ success: false, message: 'All fields are required.' });

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userResult.rows.length === 0) return res.json({ success: false, message: 'User does not exist.' });

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Incorrect password.' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await pool.query('UPDATE users SET token=$1 WHERE id=$2', [token, user.id]);

    return res.json({ success: true, message: 'Login successful.', token });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: 'Server error.' });
  }
};

const logout = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.json({ success: false, message: 'Unauthorized.' });

  try {
    await pool.query('UPDATE users SET token=NULL WHERE id=$1', [userId]);
    return res.json({ success: true, message: 'Logout successful.' });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: 'Server error.' });
  }
};

module.exports = { register, login, logout };