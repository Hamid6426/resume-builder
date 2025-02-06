import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export function initMiddleware(middleware) {
  return (req, res) => {
    return new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  };
}

const authMiddleware = (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization); // Debug log
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

export default initMiddleware(authMiddleware);
