import { z } from "zod"
import { Entity, Role, Status } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { getLatLon, mapAdministrator, mapRole, maskPrivateKey } from "~/utils/functions/adminFunctions"
import { approveContractTransaction, approveISP, approveSchool, databaseSendTxToBlockchain, unlockIspTokens } from "~/database/dbTransactions"
import { signTransaction } from "~/utils/functions/signTransaction/signTransaction"
import { prisma } from "~/database/prisma"
import { sendTicketToSlack } from "~/utils/functions/slackFunctions"
import { type CreateSchool } from "~/service/types"

export const adminRouter = createTRPCRouter({
  closeHelp: publicProcedure.input(
    z.object({
      helpId: z.string()
    })
  )
    .mutation(async ({ input }) => {
      return await prisma.helpProviders.update({
        where: {
          id: input.helpId
        }, data: {
          isOpen: false,
          updatedAt: new Date()
        }
      })
    }),

  getOpenedHelps: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const helps = await prisma.helpProviders.findMany({
      where: {
        isOpen: true
      }
    })

    if (helps.length > 0) {
      return helps
    } else {
      return [{
        name: "-",
        email: "-",
        cnpj: "-",
        subject: "-",
        message: "-",
        id: "-",
        createdAt: "-"
      }]
    }
  }),

  getClosedHelps: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const helps = await prisma.helpProviders.findMany({
      where: {
        isOpen: false
      }
    })

    if (helps.length > 0) {
      return helps
    } else {
      return [{
        name: "-",
        email: "-",
        cnpj: "-",
        subject: "-",
        message: "-",
        id: "-",
        updatedAt: "-"
      }]
    }
  }),

  getOpenedTickets: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const tickets = await prisma.tickets.findMany({
      where: {
        isOpen: true
      }
    })

    if (tickets.length > 0) {
      return tickets
    } else {
      return [{
        name: "-",
        email: "-",
        subject: "-",
        message: "-",
        id: "-",
        createdAt: "-"
      }]
    }
  }),

  getClosedTickets: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const tickets = await prisma.tickets.findMany({
      where: {
        isOpen: false
      }
    })

    if (tickets.length > 0) {
      return tickets
    } else {
      return [{
        name: "-",
        email: "-",
        subject: "-",
        message: "-",
        id: "-",
        updatedAt: "-"
      }]
    }
  }),

  openTicket: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string(),
      subject: z.string(),
      message: z.string()
    })
  )
    .mutation(async ({ input }) => {
      await sendTicketToSlack("`" + input.name + "`", "`" + input.email + "`", "`" + input.subject + "`", "`" + input.message + "`")

      return await prisma.tickets.create({
        data: {
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          isOpen: true
        }
      })
    }),

  closeTicket: publicProcedure.input(
    z.object({
      ticketId: z.string()
    })
  )
    .mutation(async ({ input }) => {
      return await prisma.tickets.update({
        where: {
          id: input.ticketId
        }, data: {
          isOpen: false,
          updatedAt: new Date()
        }
      })
    }),

  approveSchool: protectedProcedure.input(
    z.object({
      schoolId: z.string()
    })
  )
    .mutation(async ({ input, ctx }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      return await approveSchool(input.schoolId)
    }),

  approveISP: protectedProcedure.input(
    z.object({
      email: z.string()
    })
  )
    .mutation(async ({ input, ctx }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const adminId = (await prisma.admin.findUniqueOrThrow({ where: { email } })).id
      return await approveISP(input.email, adminId)
    }),

  signTransaction: protectedProcedure.input(
    z.object({
      transactionHash: z.string(),
      privateKey: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const maskedPrivateKey = maskPrivateKey(input.privateKey)

      const dbTransaction = await prisma.transactionsToSign.findUniqueOrThrow({ where: { transactionHash: input.transactionHash } })

      const signaturesAmount = dbTransaction.signatures.length
      const signatures = dbTransaction.signatures
      signatures.push(maskedPrivateKey)

      if (signaturesAmount === 0 || signaturesAmount === 1) {
        await prisma.transactionsToSign.update({ where: { id: dbTransaction.id }, data: { signatures: signatures } })
      }

      if (signaturesAmount === 2) {
        const contract = await prisma.contracts.findFirstOrThrow({ where: { id: dbTransaction.contractId } })

        const schoolToken = (await prisma.schools.findFirstOrThrow({ where: { id: contract.schoolsId } })).tokens
        if (schoolToken === null) throw new TRPCError({ code: "NOT_FOUND", message: "School token not found for sign transaction" })

        // TODO: add isp wallet 
        const isp = await prisma.internetServiceProvider.findFirstOrThrow({ where: { id: contract.internetServiceProviderId } })
        const ispWallet = isp.cnpj
        const ispCnpj = isp.cnpj

        await signTransaction(signatures[0], signatures[1], signatures[2], ispWallet, schoolToken)
        await databaseSendTxToBlockchain(input.transactionHash, dbTransaction.contractId, signatures)
        await unlockIspTokens(ispCnpj, schoolToken)
      }
    }),

  getAllTransactionsToSign: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const transactions = await prisma.transactionsToSign.findMany()
    if (transactions.length > 0) {
      const r = []

      for (const transaction of transactions) {
        const contract = await prisma.contracts.findFirstOrThrow({ where: { id: transaction.contractId } })
        const ispName = (await prisma.internetServiceProvider.findFirstOrThrow({ where: { id: contract.internetServiceProviderId } })).name
        const school = await prisma.schools.findFirstOrThrow({ where: { id: contract.schoolsId } })

        let returnSignature = transaction.signatures.length > 0 ? "" : "-"
        for (const signature of transaction.signatures) {
          returnSignature = returnSignature + signature + " "
        }

        const data = {
          ispName: ispName,
          schoolEmail: school.email,
          schoolName: school.name,
          txHash: transaction.transactionHash,
          signatures: returnSignature,
          createdAt: transaction.createdAt
        }

        r.push(data)
      }
      return r

    } else {
      return [{
        ispName: "-",
        schoolEmail: "-",
        schoolName: "-",
        txHash: "-",
        signatures: "-",
        createdAt: "-"
      }]
    }
  }),

  authorizeUser: protectedProcedure.input(
    z.object({
      email: z.string(),
      role: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const adminEmail = ctx.user?.emailAddresses[0]?.emailAddress
      if (!adminEmail) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const role = mapRole(input.role)
      if (!role) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid role" })

      const adminId = (await prisma.admin.findUniqueOrThrow({ where: { email: adminEmail } })).id
      return await prisma.authorizedUsers.create({ data: { email: input.email, role, adminId } })
    }),

  createSchool: protectedProcedure.input(
    z.object({
      name: z.string(),
      state: z.string(),
      city: z.string(),
      zipCode: z.string(),
      address: z.string(),
      inepCode: z.string(),
      email: z.string(),
      administrator: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      if (!input.name || !input.state || !input.city || !input.zipCode || !input.address || !input.inepCode || !input.email || !input.administrator) throw new TRPCError({ code: "BAD_REQUEST", message: "One or more fields missing" })

      const administrator = mapAdministrator(input.administrator)
      if (!administrator) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid administrator to create school root" })

      const latLon = await getLatLon(input.city, input.state, String(input.address.split(',')[0]))

      const schoolData: CreateSchool = {
        name: input.name,
        state: input.state,
        city: input.city,
        zipCode: input.zipCode,
        address: input.address,
        inepCode: input.inepCode,
        email: input.email,
        role: Role.SCHOOL,
        administrator,
        lat: String(latLon?.lat),
        lon: String(latLon?.lon)
      }

      return await prisma.schools.create({
        data: {
          name: schoolData.name,
          state: schoolData.state,
          city: schoolData.city,
          zipCode: schoolData.zipCode,
          address: schoolData.address,
          inepCode: schoolData.inepCode,
          email: schoolData.email,
          lat: schoolData.lat,
          lon: schoolData.lon,
          role: schoolData.role,
          administrator
        }
      })
    }),

  assignTokensToSchool: protectedProcedure.input(
    z.object({
      email: z.string(),
      tokens: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      if (!input.email || !input.tokens) throw new TRPCError({ code: "BAD_REQUEST", message: "One or more fields missing" })

      await prisma.schools.update({ where: { email: input.email }, data: { tokens: input.tokens } })
      return (await prisma.schools.findUniqueOrThrow({ where: { email: input.email } })).name
    }),

  registerAdmin: protectedProcedure.input(
    z.object({
      name: z.string(),
      entity: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      if (!input.name || !input.entity) throw new TRPCError({ code: "BAD_REQUEST", message: "One or more fields missing" })

      let entity: Entity = Entity.INVESTTOOLS
      if (input.entity.toLowerCase() == 'giga') {
        entity = Entity.GIGA
      }

      if (input.entity.toLowerCase() == 'unicef') {
        entity = Entity.UNICEF
      }

      if (input.entity.toLowerCase() == 'government') {
        entity = Entity.GOVERNMENT
      }

      if (input.entity.toLowerCase() == 'investtools') {
        entity = Entity.INVESTTOOLS
      }

      return await prisma.admin.create({
        data: {
          email,
          entity,
          name: input.name,
          role: Role.ADMIN
        }
      })
    }),

  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })


    const admin = await prisma.admin.findUnique({ where: { email } })
    if (admin == null) {
      return false
    } else {
      return true
    }
  }),

  getAuthorizedUsers: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const authorizedUsers = await prisma.authorizedUsers.findMany()
    if (authorizedUsers.length > 0) {
      const rsp = []

      for (const user of authorizedUsers) {
        const admin = await prisma.admin.findFirstOrThrow({ where: { id: user.adminId } })

        rsp.push({
          id: user.id,
          email: user.email,
          role: user.role,
          adminName: admin.name,
          adminTeam: admin.entity,
          createdAt: user.createdAt
        })
      }

      return rsp
    } else {
      return [{
        id: "-",
        email: "-",
        role: "-",
        adminName: "-",
        adminTeam: "-",
        createdAt: "-"
      }]
    }
  }),

  getPendingContracts: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const pendingContracts = await prisma.contracts.findMany({ where: { status: Status.PENDING } })
    if (pendingContracts.length > 0) {
      const rsp = []

      for (const contract of pendingContracts) {
        const data = {
          contractId: contract.id,
          schoolsId: (await prisma.schools.findFirstOrThrow({ where: { id: contract.schoolsId } })).name,
          status: contract.status,
          createdAt: contract.createdAt,
          isp: (await prisma.internetServiceProvider.findFirstOrThrow({ where: { id: contract.internetServiceProviderId } })).name
        }
        rsp.push(data)
      }
      return rsp

    } else {
      return [{
        contractId: "NONE",
        schoolsId: "NONE",
        status: "NONE",
        createdAt: "NONE",
        isp: "NONE"
      }]
    }
  }),

  getAllConnectivityReports: protectedProcedure.input(
    z.object({
      email: z.string() || null
    })
  )
    .query(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const blank = [{
        month: "NONE",
        noInternetDays: -1,
        connectionQuality: "NONE",
        averageSpeed: -1,
        connectivityPercentage: "NONE",
        createdAt: ""
      }]

      if (input.email == null) {
        return blank
      }

      const schoolInfo = await prisma.schools.findUniqueOrThrow({
        where: {
          email: input.email
        },
        include: {
          connectivityReport: true
        }
      })
      const connectivityReports = schoolInfo.connectivityReport

      if (connectivityReports.length > 0) {
        const rsp = []

        for (const report of connectivityReports) {
          const data = {
            month: String(report.month),
            noInternetDays: report.noInternetDays,
            connectionQuality: String(report.connectionQuality),
            averageSpeed: report.averageSpeed,
            connectivityPercentage: report.connectivityPercentage,
            createdAt: String(report.createdAt)
          }
          rsp.push(data)
        }
        return rsp

      } else {
        return blank
      }
    }),

  approveContract: protectedProcedure.input(
    z.object({
      contractId: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const contract = await prisma.contracts.findFirstOrThrow({ where: { id: input.contractId } })
      const school = await prisma.schools.findFirstOrThrow({ where: { id: contract.schoolsId } })
      const isp = await prisma.internetServiceProvider.findFirstOrThrow({ where: { id: contract.internetServiceProviderId } })
      const adminId = (await prisma.admin.findUniqueOrThrow({ where: { email } })).id

      if (school.tokens == null) throw new TRPCError({ code: "BAD_REQUEST", message: "No tokens found to approve contract" })

      const newTotalTokenAmount = String(Number(isp.tokenAmount) + Number(school.tokens))
      const newLockedTokens = String(Number(isp.lockedTokens) + Number(school.tokens))

      return await approveContractTransaction(adminId, school.email, contract.internetServiceProviderId, newTotalTokenAmount, newLockedTokens, contract.id)
    }),

  denyContract: protectedProcedure.input(
    z.object({
      contractId: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const adminId = (await prisma.admin.findUniqueOrThrow({ where: { email } })).id
      return await prisma.contracts.update({
        where: {
          id: input.contractId
        },
        data: {
          adminId,
          status: Status.DENIED,
          updatedAt: new Date()
        }
      })
    }),

  getAllContracts: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const contracts = await prisma.contracts.findMany()

    if (contracts.length > 0) {
      const rsp = []

      const admin = await prisma.admin.findUniqueOrThrow({ where: { email } })
      for (const contract of contracts) {
        const data = {
          reviewedAt: contract.updatedAt,
          adminName: admin.name,
          adminTeam: admin.entity,
          contractId: contract.id,
          schoolsId: (await prisma.schools.findFirstOrThrow({ where: { id: contract.schoolsId } })).name,
          status: contract.status,
          createdAt: contract.createdAt,
          isp: (await prisma.internetServiceProvider.findFirstOrThrow({ where: { id: contract.internetServiceProviderId } })).name
        }
        rsp.push(data)
      }
      return rsp

    } else {
      return [{
        reviewedAt: "NONE",
        adminName: "NONE",
        adminTeam: "NONE",
        contractId: "NONE",
        schoolsId: "NONE",
        status: "NONE",
        createdAt: "NONE",
        isp: "NONE"
      }]
    }
  }),
})