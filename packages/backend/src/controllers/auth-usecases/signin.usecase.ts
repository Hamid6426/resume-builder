import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface SigninUserInput {
  email: string;
  password: string;
}

const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: SigninUserInput = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: '1h',
  });
  return token;
};

export { signinUser };