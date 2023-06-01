import { expect } from "@jest/globals"
import { Entity, Role, Status } from "@prisma/client"
import { appRouter } from "../../root"
import { adminContextCaller, schoolTest } from "./ctx"
import { prisma } from "~/server/db"

describe('Admin Context Tests', () => {
    const caller = appRouter.createCaller({ user: adminContextCaller, prisma })
    if (adminContextCaller.emailAddresses[0] === null || adminContextCaller.emailAddresses[0] === undefined) return new Error()
    const adminEmail = adminContextCaller.emailAddresses[0].emailAddress
    const schoolTokens = "5000"

    it('Should return false before creating admin and true after', async () => {
        expect(await caller.admin.isAdmin()).toEqual(false) // returns false bc admin doesn't exist yet

        await caller.admin.registerAdmin({ name: "test", entity: Entity.INVESTTOOLS }) // register admin

        expect(await caller.admin.isAdmin()).toEqual(true) // returns true bc admin exists now

        await prisma.admin.delete({ where: { email: adminEmail } }) // delete admin

        expect(await caller.admin.isAdmin()).toEqual(false) // returns false bc admin no longer exists
    })

    it('Should authorize an user and check if the user is now authorized', async () => {
        expect(await caller.generalLogin.getAuthorizedRole()).toStrictEqual("not found") // user is not authorized yet

        await caller.admin.registerAdmin({ name: "test", entity: Entity.INVESTTOOLS }) // register admin to authorize user

        await caller.admin.authorizeUser({ email: adminEmail, role: Role.ADMIN }) // authorize user 

        expect(await caller.generalLogin.getAuthorizedRole()).toStrictEqual(Role.ADMIN) // user is now authorized

        await prisma.authorizedUsers.delete({ where: { email: adminEmail } }) // delete authorized user
        await prisma.admin.delete({ where: { email: adminEmail } }) // delete admin

        expect(await caller.generalLogin.getAuthorizedRole()).toStrictEqual("not found") // user is no longer authorized
    })

    it('Should create a school and assign tokens to it', async () => {
        await caller.admin.registerAdmin({ name: "test", entity: Entity.INVESTTOOLS }) // register admin to create school

        const createSchool = await caller.admin.createSchool(schoolTest) // create school
        expect(createSchool.email).toStrictEqual(schoolTest.email) // expect that school has been created

        expect((await prisma.schools.findUniqueOrThrow({ where: { cnpj: schoolTest.cnpj } })).tokens).toEqual(null) // school should not have tokens yet

        await caller.admin.assignTokensToSchool({ tokens: schoolTokens, cnpj: schoolTest.cnpj }) // assign tokens
        expect((await prisma.schools.findUniqueOrThrow({ where: { cnpj: schoolTest.cnpj } })).tokens).toEqual(schoolTokens) // now school must have tokens

        await prisma.admin.delete({ where: { email: adminEmail } }) // delete admin
        await prisma.schools.delete({ where: { email: schoolTest.email } }) // delete school
    })

    it('Should create a transaction, find it and sign', async () => {
        await caller.admin.registerAdmin({ name: "test", entity: Entity.INVESTTOOLS }) // register admin

        const createISP = await caller.internetServiceProviders.registerISP({ name: "ispTest", cnpj: "ispTestCnpj" }) // register ISP 
        expect(createISP.cnpj).toStrictEqual("ispTestCnpj") // expect that isp has been registered

        const createSchool = await caller.admin.createSchool(schoolTest) // create school
        expect(createSchool.email).toStrictEqual(schoolTest.email) // expect that school has been created

        const createContract = await caller.internetServiceProviders.createContract({ schoolCnpj: schoolTest.cnpj }) // create contract
        expect(createContract.internetServiceProviderId).toStrictEqual(createISP.id) // expect that contract has been created

        const createTransaction = await prisma.transactionsToSign.create({ data: { transactionHash: "txHashTest", signatures: [], contractId: createContract.id } }) // create the transaction to sign
        expect(createTransaction.transactionHash).toStrictEqual("txHashTest") // expect that the transaction has been created

        const transactionsToSign = await caller.admin.getAllTransactionsToSign()
        for (const transaction of transactionsToSign) {
            if (transaction.txHash === createTransaction.transactionHash) {
                expect(transaction.schoolCnpj).toStrictEqual(createSchool.cnpj) // expect that we found the right transaction
                expect(transaction.signatures).toStrictEqual("-") // expect that there is no signature
            }
        }

        await caller.admin.signTransaction({ transactionHash: createTransaction.transactionHash, privateKey: "privateKeyTest" }) // sign the transaction

        const transaction = await prisma.transactionsToSign.findUniqueOrThrow({ where: { transactionHash: createTransaction.transactionHash } })
        expect(transaction.signatures.length).toEqual(1) // expect that there is one signature
        expect(transaction.signatures[0]).toStrictEqual("priv****Test") // expect that the signature has been correctly masked

        await prisma.transactionsToSign.delete({ where: { id: createTransaction.id } }) // delete transaction
        await prisma.contracts.delete({ where: { id: createContract.id } }) // delete contract
        await prisma.internetServiceProvider.delete({ where: { id: createISP.id } }) // delete ISP
        await prisma.schools.delete({ where: { id: createSchool.id } }) // delete school
        await prisma.admin.delete({ where: { email: adminEmail } }) // delete admin
    })

    it('Should approve contract', async () => {
        await caller.admin.registerAdmin({ name: "test", entity: Entity.INVESTTOOLS }) // register admin

        const createISP = await caller.internetServiceProviders.registerISP({ name: "ispTest", cnpj: "ispTestCnpj" }) // register ISP 
        expect(createISP.cnpj).toStrictEqual("ispTestCnpj") // expect that isp has been registered

        const createSchool = await caller.admin.createSchool(schoolTest) // create school
        expect(createSchool.email).toStrictEqual(schoolTest.email) // expect that school has been created

        await caller.admin.assignTokensToSchool({ tokens: schoolTokens, cnpj: schoolTest.cnpj }) // assign tokens to school

        const createContract = await caller.internetServiceProviders.createContract({ schoolCnpj: schoolTest.cnpj }) // create contract

        expect(createContract.internetServiceProviderId).toStrictEqual(createISP.id) // expect that contract has been created
        expect(createContract.status).toStrictEqual(Status.PENDING) // expect that contract is pending

        await caller.admin.approveContract({ contractId: createContract.id }) // approve contract
        expect((await prisma.contracts.findFirstOrThrow({ where: { id: createContract.id } })).status).toStrictEqual(Status.APPROVED) // expect that the contract has been approved

        await prisma.contracts.delete({ where: { id: createContract.id } }) // delete contract
        await prisma.internetServiceProvider.delete({ where: { id: createISP.id } }) // delete ISP
        await prisma.schools.delete({ where: { id: createSchool.id } }) // delete school
        await prisma.admin.delete({ where: { email: adminEmail } }) // delete admin
    })

    it('Should deny contract', async () => {
        await caller.admin.registerAdmin({ name: "test", entity: Entity.INVESTTOOLS }) // register admin

        const createISP = await caller.internetServiceProviders.registerISP({ name: "ispTest", cnpj: "ispTestCnpj" }) // register ISP 
        expect(createISP.cnpj).toStrictEqual("ispTestCnpj") // expect that isp has been registered

        const createSchool = await caller.admin.createSchool(schoolTest) // create school
        expect(createSchool.email).toStrictEqual(schoolTest.email) // expect that school has been created

        const createContract = await caller.internetServiceProviders.createContract({ schoolCnpj: schoolTest.cnpj }) // create contract

        expect(createContract.internetServiceProviderId).toStrictEqual(createISP.id) // expect that contract has been created
        expect(createContract.status).toStrictEqual(Status.PENDING) // expect that contract is pending

        await caller.admin.denyContract({ contractId: createContract.id }) // deny contract
        expect((await prisma.contracts.findFirstOrThrow({ where: { id: createContract.id } })).status).toStrictEqual(Status.DENIED) // expect that the contract has been denied

        await prisma.contracts.delete({ where: { id: createContract.id } }) // delete contract
        await prisma.internetServiceProvider.delete({ where: { id: createISP.id } }) // delete ISP
        await prisma.schools.delete({ where: { id: createSchool.id } }) // delete school
        await prisma.admin.delete({ where: { email: adminEmail } }) // delete admin
    })
})