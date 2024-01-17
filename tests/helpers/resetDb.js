// src/tests/helpers/reset-db.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async () => {
    await prisma.$transaction([
        prisma.category.deleteMany(),
        prisma.course.deleteMany(),
        prisma.courseSection.deleteMany(),
        prisma.lecturer.deleteMany(),
        prisma.profile.deleteMany(),
    ])
}
