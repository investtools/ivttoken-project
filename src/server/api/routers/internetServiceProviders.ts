import { Role, Status } from '@prisma/client'
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { benefitPriceByName, mapBenefitType } from '~/utils/functions/benefitsFunctions'
import { ispBuyBenefitsTransaction } from '~/database/dbTransactions'
import { prisma } from '~/database/prisma'
import { sendIspToSlack } from '~/utils/functions/slackFunctions'

export const internetServiceProvidersRouter = createTRPCRouter({
  getIspToBeApproved: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const ispToBeApproved = await prisma.internetServiceProviderToBeApproved.findMany()

    if (ispToBeApproved.length > 0) {
      return ispToBeApproved
    } else {
      return [{
        email: "-",
        name: "-",
        cnpj: "-",
        createdAt: "-"
      }]
    }
  }),

  ispToBeApproved: publicProcedure.input(
    z.object({
      name: z.string(),
      cnpj: z.string(),
      email: z.string()
    })
  )
    .mutation(async ({ input }) => {
      if (!input.name || !input.cnpj || !input.email) throw new TRPCError({ code: "BAD_REQUEST", message: "One or more fields missing" })

      await prisma.internetServiceProviderToBeApproved.create({
        data: {
          name: input.name,
          cnpj: input.cnpj,
          email: input.email
        }
      })

      await sendIspToSlack("`" + input.name + "`", "`" + input.cnpj + "`", "`" + input.email + "`")
    }),

  isIsp: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const isp = await prisma.internetServiceProvider.findUnique({ where: { email } })
    if (isp == null) {
      return false
    } else {
      return true
    }
  }),

  getIspData: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const ispData = await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email } })
    return {
      tokenAmount: ispData.tokenAmount,
      unlockedTokens: ispData.unlockedTokens,
      lockedTokens: ispData.lockedTokens,
      spentTokens: ispData.spentTokens,
      tokensHistory: String(Number(ispData.tokenAmount) + Number(ispData.spentTokens))
    }
  }),

  getIspTransactions: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const ispTokenTransactions = (await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email }, include: { tokenTransactions: true } })).tokenTransactions
    if (ispTokenTransactions.length > 0) {
      return ispTokenTransactions
    } else {
      return [{
        benefit: "NONE",
        benefitPrice: "NONE",
        createdAt: "NONE",
        id: "NONE"
      }]
    }
  }),

  getIspContracts: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const ispContracts = (await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email }, include: { contracts: true } })).contracts

    if (ispContracts.length > 0) {
      const rsp = []

      for (const contract of ispContracts) {
        const data = {
          schoolsId: (await prisma.schools.findFirstOrThrow({ where: { id: contract.schoolsId } })).name,
          status: contract.status,
          createdAt: contract.createdAt
        }
        rsp.push(data)
      }
      return rsp

    } else {
      return [{
        schoolsId: "NONE",
        status: "NONE",
        createdAt: "NONE"
      }]
    }
  }),

  registerISP: protectedProcedure.input(
    z.object({
      name: z.string(),
      cnpj: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      return await prisma.internetServiceProvider.create({
        data: {
          name: input.name,
          cnpj: input.cnpj,
          tokenAmount: '0',
          unlockedTokens: '0',
          lockedTokens: '0',
          spentTokens: '0',
          email,
          role: Role.ISP
        }
      })
    }),

  buyBenefits: protectedProcedure.input(
    z.object({
      selectedBenefit: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      if (input.selectedBenefit == undefined) throw new TRPCError({ code: "BAD_REQUEST", message: "Benefício de input undefined para comprar benefícios" })

      const isp = await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email } })
      const ispCnpj = isp.cnpj
      const ispId = isp.id

      const benefit = mapBenefitType(input.selectedBenefit)
      const benefitPrice = benefitPriceByName(input.selectedBenefit)

      if (Number(isp.unlockedTokens) < Number(benefitPrice)) {
        return false
      }

      const newSpentTokens = String(Number(isp.spentTokens) + Number(benefitPrice))
      const newUnlockedTokens = String(Number(isp.unlockedTokens) - Number(benefitPrice))
      const newTokenAmount = String(Number(isp.tokenAmount) - Number(benefitPrice))

      if (benefit === undefined) throw new TRPCError({ code: "BAD_REQUEST", message: "Mapeamento de benefício undefined para comprar benefícios" })
      if (benefitPrice === undefined) throw new TRPCError({ code: "BAD_REQUEST", message: "Mapeamento de preço undefined para comprar benefícios" })

      return await ispBuyBenefitsTransaction(ispCnpj, newSpentTokens, newUnlockedTokens, newTokenAmount, benefit, benefitPrice, ispId)
    }),

  ispUnlockedTokens: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    return (await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email } })).unlockedTokens
  }),

  createContract: protectedProcedure.input(
    z.object({
      schoolEmail: z.string()
    })
  )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user?.emailAddresses[0]?.emailAddress
      if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

      const ispId = (await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email } })).id
      const schoolId = (await prisma.schools.findUniqueOrThrow({ where: { email: input.schoolEmail } })).id
      return await prisma.contracts.create({
        data: {
          status: Status.PENDING,
          schoolsId: schoolId,
          internetServiceProviderId: ispId
        }
      })
    }),

  getIspSchools: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress

    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const isp = await prisma.internetServiceProvider.findUniqueOrThrow({ where: { email }, include: { schools: true } })
    const schools = isp.schools

    if (schools.length === 0) {
      return [{
        name: "-",
        state: "-",
        city: "-",
        zipCode: "-",
        address: "-",
        cnpj: "-",
        inepCode: "-",
        administrator: "-",
        email: "-",
        tokens: "-",
        connectivityReport: []
      }]
    } else {
      const rsp = []

      for (const school of schools) {
        const connectivityReport = (await prisma.schools.findUniqueOrThrow({ where: { email: school.email }, include: { connectivityReport: true } })).connectivityReport

        const data = {
          name: school.name,
          state: school.state,
          city: school.city,
          zipCode: school.zipCode,
          address: school.address,
          inepCode: school.inepCode,
          administrator: school.administrator,
          email: school.email,
          tokens: school.tokens,
          connectivityReport
        }
        rsp.push(data)
      }
      return rsp
    }
  }),
})