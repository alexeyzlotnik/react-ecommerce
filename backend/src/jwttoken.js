import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.JWT_SECRET_KEY;

// Token blacklist for logout functionality
const tokenBlacklist = new Set();

// Default JWT options
const defaultOptions = {
  expiresIn: '24h', // Token expires in 24 hours
  issuer: 'cool-shop',
  audience: 'cool-shop'
};

/**
 * Generate a JWT token
 * @param {Object} payload - The data to encode in the token
 * @param {Object} options - JWT options (optional)
 * @returns {string} The generated JWT token
 */
export const jwtGenerate = (payload, options = {}) => {
  try {
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not configured');
    }

    const jwtOptions = { ...defaultOptions, ...options };
    const token = jwt.sign(payload, secret, jwtOptions);
    return token;
  } catch (error) {
    throw new Error(`Failed to generate JWT token: ${error.message}`);
  }
};

/**
 * Verify a JWT token
 * @param {string} token - The JWT token to verify
 * @param {Object} options - JWT verification options (optional)
 * @returns {Object} The decoded token payload
 */
export const jwtVerify = (token, options = {}) => {
  try {
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not configured');
    }

    if (!token) {
      throw new Error('Token is required');
    }

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      throw new Error('Token has been invalidated');
    }

    const jwtOptions = { ...defaultOptions, ...options };
    const decoded = jwt.verify(token, secret, jwtOptions);
    return decoded;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'NotBeforeError') {
      throw new Error('Token not active yet');
    } else {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }
};

/**
 * Invalidate a JWT token (add to blacklist)
 * @param {string} token - The JWT token to invalidate
 */
export const invalidateToken = (token) => {
  if (token) {
    tokenBlacklist.add(token);
    console.log('Token added to blacklist');
  }
};

/**
 * Clean up expired tokens from blacklist
 */
export const cleanupBlacklist = () => {
  const currentTime = Math.floor(Date.now() / 1000);
  const tokensToRemove = [];

  for (const token of tokenBlacklist) {
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp && decoded.exp < currentTime) {
        tokensToRemove.push(token);
      }
    } catch (error) {
      // Invalid token, remove it
      tokensToRemove.push(token);
    }
  }

  tokensToRemove.forEach(token => tokenBlacklist.delete(token));

  if (tokensToRemove.length > 0) {
    console.log(`Cleaned up ${tokensToRemove.length} expired tokens from blacklist`);
  }
};

/**
 * Check if a token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if token is expired, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Consider invalid tokens as expired
  }
};

// Clean up blacklist every hour
setInterval(cleanupBlacklist, 60 * 60 * 1000);