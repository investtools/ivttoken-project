import { createTRPCRouter } from "~/server/api/trpc"
import { schoolsRouter } from "~/server/api/routers/schools"
import { internetServiceProvidersRouter } from "./routers/internetServiceProviders"
import { adminRouter } from "./routers/admin"
import { generalLoginRouter } from "./routers/generalLogin"


export const appRouter = createTRPCRouter({
  schools: schoolsRouter,
  generalLogin: generalLoginRouter,
  internetServiceProviders: internetServiceProvidersRouter,
  admin: adminRouter
})

export type AppRouter = typeof appRouter