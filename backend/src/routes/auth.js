import express from "express"
const router = express.Router();
import usersData from "../data/users.js";
import { jwtGenerate, jwtVerify, invalidateToken } from "../jwttoken.js";

// JWT verification endpoint
router.post('/verify', async (req, res) => {
  try {
    // Get token from cookies instead of Authorization header
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        valid: false,
        message: 'No token found in cookies'
      });
    }

    // Verify the token
    const decoded = jwtVerify(token);

    // Get user data from the decoded token
    const user = await usersData.getUserById(decoded.id);
    // console.log('User found:', user);

    if (!user) {
      // console.log('User not found for ID:', decoded.id);
      return res.status(401).json({
        valid: false,
        message: 'User not found'
      });
    }

    // console.log('Token verification successful for user:', user.name);
    res.status(200).json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    // console.error('Token verification error:', error);
    res.status(401).json({
      valid: false,
      message: error.message || 'Token verification failed'
    });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      // Invalidate the token on the server
      invalidateToken(token);
      console.log('Token invalidated on logout');
    }

    // Clear the cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// Login POST endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const result = await usersData.verifyUser(email, password);

    if (result.success) {
      // Generate JWT token
      const token = jwtGenerate({ email: result.user.email, id: result.user.id }, { expiresIn: '1h' });

      // Set cookie only on successful login
      res.cookie('jwt', token, {
        httpOnly: true,  // Prevent XSS attacks - not accessible by JavaScript
        secure: false,   // Set to true in production with HTTPS
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour (matching token expiration)
        path: '/'
      });

      // Send response WITHOUT token in body (cookie only)
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: result.user
      });
    } else {
      console.log('Login failed:', result.message);
      res.status(401).json(result);
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// Register route
router.get('/register', (req, res) => {
  res.status(200).send('<h1>Register</h1><p>Create a new account</p>');
});

// Register POST endpoint
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  const result = await usersData.createUser({ name, email, password });

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;