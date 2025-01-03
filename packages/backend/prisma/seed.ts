// RUN ONLY FOR DUMMY DATA ONLY ONCE IN THE BEGINNING AND DONT LOST YOUR WORK BY DOING THIS

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.$connect();
    // Add seed data here
    await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: 'password123',
        userName: 'John1234',
        firstName: 'John',
        lastName: 'Doe',
      },
    });
    console.log('Database seeding successful!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();