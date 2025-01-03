// auth.middleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationToken = req.header('Authorization')?.replace('Bearer ', '');
  if (!authorizationToken) {
    return res.status(401).json({ message: 'Please authenticate' });
  }

  try {
    const decodedToken = jwt.verify(authorizationToken, process.env.SECRET_KEY!);
    req.currentUser = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export { authenticateUser };