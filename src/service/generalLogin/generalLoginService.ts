import { TRPCError } from "@trpc/server"
import { prisma } from "~/database/prisma"

export class GeneralLoginService {
    private readonly userEmail: string

    constructor(userEmail: string) {
        this.userEmail = userEmail
    }

    public async userHasAccount() {
        const searchIspDb = await prisma.internetServiceProvider.findUnique({ where: { email: this.userEmail } })
        const searchAdminDb = await prisma.admin.findUnique({ where: { email: this.userEmail } })

        if (searchIspDb == null && searchAdminDb == null) {
            return false
        }
        return true
    }

    public async getUserRole() {
        const userHasAccount = await this.userHasAccount()

        if (userHasAccount) {
            const searchIspDb = await prisma.internetServiceProvider.findUnique({ where: { email: this.userEmail } })
            const searchAdminDb = await prisma.admin.findUnique({ where: { email: this.userEmail } })

            if (searchIspDb != null) return searchIspDb.role
            if (searchAdminDb != null) return searchAdminDb.role
        } else throw new TRPCError({ code: "NOT_FOUND", message: "User has no account" })
    }

    public async getUserInfo() {
        const userHasAccount = await this.userHasAccount()

        if (userHasAccount) {
            const searchIspDb = await prisma.internetServiceProvider.findUnique({ where: { email: this.userEmail } })
            const searchAdminDb = await prisma.admin.findUnique({ where: { email: this.userEmail } })

            if (searchIspDb != null) return searchIspDb
            if (searchAdminDb != null) return searchAdminDb
        } else throw new TRPCError({ code: "NOT_FOUND", message: "User has no account" })
    }
}