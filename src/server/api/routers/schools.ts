import { z } from "zod"
import { SchoolsService } from "~/service/schools/schoolsService"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { administratorNameMapping, mapAdministrator } from "~/utils/functions/adminFunctions"
import axios from "axios"
import { type OpenWeatherResponse } from "~/service/schools/interfaces/interfaces"
import { Role } from "@prisma/client"
import { prisma } from "~/database/prisma"
import { sendSchoolToSlack } from "~/utils/functions/slackFunctions"

export const schoolsRouter = createTRPCRouter({
  getSchoolsToBeApproved: publicProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const schoolsToBeApproved = await prisma.schoolsToBeApproved.findMany()

    if (schoolsToBeApproved.length > 0) {
      return schoolsToBeApproved
    } else {
      return [{
        name: "-",
        state: "-",
        city: "-",
        zipCode: "-",
        address: "-",
        cnpj: "-",
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
      cnpj: z.string(),
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
          cnpj: input.cnpj,
          inepCode: input.inepCode,
          email: input.email,
          role: Role.SCHOOL,
          administrator: administrator
        }
      })

      await sendSchoolToSlack("`" + input.name + "`", "`" + input.zipCode + "`", "`" + input.state + "`", "`" + input.city + "`", "`" + input.address + "`", "`" + input.cnpj + "`", "`" + input.inepCode + "`", "`" + input.email + "`", "`" + input.administrator + "`")
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
    const schoolsService = new SchoolsService()
    return await schoolsService.getAll()
  }),

  getAvailable: publicProcedure.query(async ({ }) => {
    const schoolsService = new SchoolsService()

    const available = await schoolsService.getAvailable()
    const rsp = []

    for (const school of available) {
      if (school.tokens != null && Number(school.tokens) > 0 && school.internetServiceProviderId == null) {
        rsp.push(school)
      }
    }
    return rsp
  }),

  getSchoolsWithTokens: publicProcedure.query(async ({ }) => {
    const schoolsService = new SchoolsService()
    const availableSchools = await schoolsService.getAvailable()

    const schoolsWithTokens = []

    for (const school of availableSchools) {
      if (school.tokens != null) {
        schoolsWithTokens.push(school)
      }
    }

    return schoolsWithTokens
  }),

  getNoTokensSchools: publicProcedure.query(async ({ }) => {
    const schoolsService = new SchoolsService()
    return await schoolsService.getNoTokensSchools()
  }),

  findSchoolNameByCnpj: publicProcedure.input(
    z.object({
      cnpj: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.cnpj) throw new TRPCError({ code: "BAD_REQUEST", message: "CNPJ missing" })

      const schoolsService = new SchoolsService()

      return await schoolsService.searchSchoolNameByCnpj(input.cnpj)
    }),

  doesSchoolExist: publicProcedure.input(
    z.object({
      cnpj: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.cnpj) throw new TRPCError({ code: "BAD_REQUEST", message: "CNPJ missing" })

      const schoolsService = new SchoolsService()
      const school = await schoolsService.findByCnpj(input.cnpj)

      if (school == null) {
        return false
      } else {
        return true
      }
    }),

  getSchoolByCnpj: publicProcedure.input(
    z.object({
      cnpj: z.string()
    })
  )
    .query(async ({ input }) => {
      if (!input.cnpj) throw new TRPCError({ code: "BAD_REQUEST", message: "CNPJ missing" })

      const schoolsService = new SchoolsService()
      const data = await schoolsService.searchByCnpj(input.cnpj)

      const resp = {
        Name: data.name,
        State: data.state,
        City: data.city,
        ZipCode: data.zipCode,
        Address: data.address,
        CNPJ: data.cnpj,
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