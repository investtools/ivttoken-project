import { Administrators, Role, PrismaClient, Entity, Status } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const schoolA = await prisma.schools.create({
        data: {
            name: "Escola A",
            state: "SP",
            city: "São Paulo",
            zipCode: "00000-000",
            address: "Rua A, 123",
            cnpj: "cnpjSchoolA",
            inepCode: "12345678",
            email: "escolaA@example.com",
            role: Role.SCHOOL,
            administrator: Administrators.STATE,
            tokens: "2000"
        }
    })

    const admin1 = await prisma.admin.create({
        data: {
            name: "Murillo Lamberti",
            entity: Entity.INVESTTOOLS,
            email: "murillo@blockchainstudio.com.br",
            role: Role.ADMIN
        }
    })

    const authorizeAdmin1 = await prisma.authorizedUsers.create({
        data: {
            email: "murillo@blockchainstudio.com.br",
            role: Role.ADMIN,
            adminId: admin1.id
        }
    })

    const admin2 = await prisma.admin.create({
        data: {
            name: "InvestTools Admin",
            entity: Entity.INVESTTOOLS,
            email: "ivttoken.adm@gmail.com",
            role: Role.ADMIN
        }
    })

    const authorizeAdmin2 = await prisma.authorizedUsers.create({
        data: {
            email: "ivttoken.adm@gmail.com",
            role: Role.ADMIN,
            adminId: admin1.id
        }
    })

    const authorizeIsp = await prisma.authorizedUsers.create({
        data: {
            email: "ivttoken.isp@gmail.com",
            role: Role.ISP,
            adminId: admin1.id
        }
    })

    const isp = await prisma.internetServiceProvider.create({
        data: {
            name: "InvestTools ISP",
            cnpj: "cnpjISP",
            tokenAmount: "1000",
            unlockedTokens: "0",
            lockedTokens: "1000",
            spentTokens: "0",
            email: "ivttoken.isp@gmail.com",
            role: Role.ISP
        }
    })

    const schoolB = await prisma.schools.create({
        data: {
            name: "Escola B",
            state: "SP",
            city: "São Paulo",
            zipCode: "00000-000",
            address: "Rua A, 123",
            cnpj: "cnpjSchoolB",
            inepCode: "87654321",
            email: "escolaB@example.com",
            role: Role.SCHOOL,
            administrator: Administrators.MUNICIPALITY,
            tokens: "1000"
        }
    })

    const contract = await prisma.contracts.create({
        data: {
            schoolsId: schoolB.id,
            internetServiceProviderId: isp.id,
            status: Status.PENDING
        }
    })

    console.log({ schoolA, authorizeAdmin1, admin2, authorizeAdmin2, authorizeIsp, contract })
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
