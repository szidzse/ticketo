import { PrismaClient } from "@prisma/client";

/**
 * Type declaration for the global object to include the PrismaClient instance
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Initialize the PrismaClient instance and assign it to the global object
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"], // Log only errors and warnings
  });

/**
 * In non-production environments, assign the PrismaClient instance to the global object
 * This prevents the creation of multiple instances of PrismaClient during hot-reloading
 * in development mode, which can lead to performance issues and connection limits.
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
