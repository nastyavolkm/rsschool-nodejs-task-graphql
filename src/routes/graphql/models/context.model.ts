import { PrismaClient } from "@prisma/client";


export interface ContextModel {
    prisma: PrismaClient,
}
