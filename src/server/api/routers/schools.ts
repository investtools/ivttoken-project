import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { administratorNameMapping, mapAdministrator } from "~/utils/functions/adminFunctions"
import axios from "axios"
import { Role, Status } from "@prisma/client"
import { prisma } from "~/database/prisma"
import { sendSchoolToSlack } from "~/utils/functions/slackFunctions"
import { type OpenWeatherResponse } from "~/service/types"

export const schoolsRouter = createTRPCRouter({
  getSchoolsToBeApproved: publicProcedure.query(async ({ ctx }) => {
    const email = ctx.session?.user.email
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const schoolsToBeApproved = await prisma.schoolsToBeApproved.findMany({ where: { deniedAt: null, deletedAt: null } })

    if (schoolsToBeApproved.length > 0) {
      return schoolsToBeApproved
    } else {
      return [{
        name: "-",
        state: "-",
        city: "-",
        zipCode: "-",
        address: "-",
        inepCode: "-",
        email: "-",
        administrator: "-",
        createdAt: "-",
        id: "-"
      }]
    }
  }),

  schoolToBeApproved: publicProcedure.input(
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
    .mutation(async ({ input }) => {
      if (!input.name || !input.state || !input.city || !input.zipCode || !input.address || !input.inepCode || !input.email || !input.administrator) throw new TRPCError({ code: "BAD_REQUEST", message: "One or more fields missing" })

      const administrator = mapAdministrator(input.administrator)
      if (!administrator) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid administrator to create school root" })

      await prisma.schoolsToBeApproved.create({
        data: {
          name: input.name,
          state: input.state,
          city: input.city,
          zipCode: input.zipCode,
          address: input.address,
          inepCode: input.inepCode,
          email: input.email,
          role: Role.SCHOOL,
          administrator: administrator
        }
      })

      await sendSchoolToSlack("`" + input.name + "`", "`" + input.zipCode + "`", "`" + input.state + "`", "`" + input.city + "`", "`" + input.address + "`", "`" + input.inepCode + "`", "`" + input.email + "`", "`" + input.administrator + "`")
    }),

  getLatLon: publicProcedure.input(
    z.object({
      input: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.input) throw new TRPCError({ code: "BAD_REQUEST", message: "missing input" })

      if (process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY) {
        const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input.input},BR&limit=10&appid=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
        const request = await axios.get<OpenWeatherResponse[]>(baseUrl)

        if (request.data && request.data.length > 0) {
          const [response = {} as OpenWeatherResponse] = request.data
          return {
            lat: response.lat,
            lon: response.lon
          }
        } else {
          throw new TRPCError({ code: "BAD_REQUEST", message: "no data from geolocation request" })
        }
      }
    }),

  getAll: publicProcedure.query(async ({ }) => {
    return await prisma.schools.findMany({ include: { connectivityReport: true } })
  }),

  getAvailable: publicProcedure.query(async ({ }) => {
    const availableSchools = await prisma.schools.findMany({ include: { internetServiceProvider: false, contracts: true } })
    const available = []

    for (const school of availableSchools) {
      if (school.contracts.length === 0) {
        available.push(school)
      } else if (school.contracts.length > 0) {
        for (const contract of school.contracts) {
          const contractStatus = contract.status
          if (contractStatus == Status.DENIED) {
            available.push(school)
          }
        }
      }
    }
    const rsp = []

    for (const school of available) {
      if (school.tokens != null && Number(school.tokens) > 0 && school.internetServiceProviderId == null) {
        rsp.push(school)
      }
    }
    return rsp
  }),

  getSchoolsWithTokens: publicProcedure.query(async ({ }) => {
    const availableSchools = await prisma.schools.findMany({ include: { internetServiceProvider: false, contracts: true } })
    const available = []

    for (const school of availableSchools) {
      if (school.contracts.length === 0) {
        available.push(school)
      } else if (school.contracts.length > 0) {
        for (const contract of school.contracts) {
          const contractStatus = contract.status
          if (contractStatus == Status.DENIED) {
            available.push(school)
          }
        }
      }
    }

    const schoolsWithTokens = []

    for (const school of available) {
      if (school.tokens != null) {
        schoolsWithTokens.push(school)
      }
    }

    return schoolsWithTokens
  }),

  getNoTokensSchools: publicProcedure.query(async ({ }) => {
    const availableSchools = await prisma.schools.findMany({ include: { internetServiceProvider: false, contracts: true } })
    const available = []

    for (const school of availableSchools) {
      if (school.contracts.length === 0) {
        available.push(school)
      } else if (school.contracts.length > 0) {
        for (const contract of school.contracts) {
          const contractStatus = contract.status
          if (contractStatus == Status.DENIED) {
            available.push(school)
          }
        }
      }
    }
    const noTokensSchools = []

    for (const school of available) {
      if (school.tokens == null) {
        noTokensSchools.push(school)
      }
    }
    return noTokensSchools
  }),

  findSchoolNameByEmail: publicProcedure.input(
    z.object({
      email: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.email) throw new TRPCError({ code: "BAD_REQUEST", message: "Email missing" })
      return (await prisma.schools.findUniqueOrThrow({ where: { email: input.email } })).name
    }),

  doesSchoolExist: publicProcedure.input(
    z.object({
      email: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.email) throw new TRPCError({ code: "BAD_REQUEST", message: "Email missing" })

      const school = await prisma.schools.findUnique({ where: { email: input.email } })
      if (school == null) {
        return false
      } else {
        return true
      }
    }),

  getSchoolByEmail: publicProcedure.input(
    z.object({
      email: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.email) throw new TRPCError({ code: "BAD_REQUEST", message: "Email missing" })

      const data = await prisma.schools.findUniqueOrThrow({ where: { email: input.email }, include: { connectivityReport: true } })
      const resp = {
        Name: data.name,
        State: data.state,
        City: data.city,
        ZipCode: data.zipCode,
        Address: data.address,
        InepCode: data.inepCode,
        Admnistrator: administratorNameMapping(data.administrator),
        EMail: data.email,
        Tokens: data.tokens,
        Provider: "-",
        Reports: data.connectivityReport.length
      }
      return resp
    })
})
