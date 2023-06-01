import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const schools = await prisma.schools.findMany()

    console.log({ schools })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })