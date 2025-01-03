// auth.controller.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { authenticateUser } from 'src/middleswares/authMiddleware';

const prisma = new PrismaClient();

interface SignupUserInput {
  email: string;
  password: string;
  name: string;
}

const validateInput = (input: SignupUserInput) => {
  if (!input.email || !input.password || !input.name) {
    throw new Error('All fields are required');
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)) {
    throw new Error('Invalid email format');
  }

  if (input.password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const input: SignupUserInput = req.body;
    validateInput(input);

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export { signupUser };