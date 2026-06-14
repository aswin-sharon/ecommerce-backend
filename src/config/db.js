// Database configuration using Prisma
// Connection string is defined in .env as DATABASE_URL
// Example: postgresql://user:password@localhost:5432/ecommerce_db

import prisma from "./prisma.js";

const connectDB = async () => {
    try {
        // Test connection
        await prisma.$queryRaw`SELECT 1`;
        console.log("PostgreSQL connected successfully via Prisma");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;