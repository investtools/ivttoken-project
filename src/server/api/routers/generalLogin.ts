import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { GeneralLoginService } from "~/service/generalLogin/generalLoginService"
import { prisma } from "~/database/prisma"

export const generalLoginRouter = createTRPCRouter({
  userHasAccount: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const loginService = new GeneralLoginService(email)
    const data = await loginService.userHasAccount()

    return data
  }),

  getUserRole: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const loginService = new GeneralLoginService(email)
    const data = await loginService.getUserRole()

    return data
  }),

  getAuthorizedRole: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.user?.emailAddresses[0]?.emailAddress
    if (!email) throw new TRPCError({ code: "BAD_REQUEST", message: "There is no email" })

    const data = await prisma.authorizedUsers.findUnique({where: {email}})
    if (data == null) {
      return "not found"
    } else {
      return data.role
    }
  })
})