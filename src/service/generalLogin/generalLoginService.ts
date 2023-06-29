import { TRPCError } from "@trpc/server"
import { AdminDatabaseService } from "~/database/adminDatabaseService"
import { InternetServiceProviderDatabaseService } from "~/database/internetServiceProviderDatabaseService"

export class GeneralLoginService {
    private readonly userEmail: string
    private readonly adminDbService: AdminDatabaseService
    private readonly ispDbService: InternetServiceProviderDatabaseService

    constructor(userEmail: string) {
        this.userEmail = userEmail
        this.adminDbService = new AdminDatabaseService()
        this.ispDbService = new InternetServiceProviderDatabaseService()
    }

    public async userHasAccount() {
        const searchIspDb = await this.ispDbService.findByEmail(this.userEmail)
        const searchAdminDb = await this.adminDbService.findByEmail(this.userEmail)

        if (searchIspDb == null && searchAdminDb == null) {
            return false
        }
        return true
    }

    public async getUserRole() {
        const userHasAccount = await this.userHasAccount()

        if (userHasAccount) {
            const searchIspDb = await this.ispDbService.findByEmail(this.userEmail)
            const searchAdminDb = await this.adminDbService.findByEmail(this.userEmail)

            if (searchIspDb != null) return searchIspDb.role
            if (searchAdminDb != null) return searchAdminDb.role
        } else throw new TRPCError({ code: "NOT_FOUND", message: "User has no account" })
    }

    public async getUserInfo() {
        const userHasAccount = await this.userHasAccount()

        if (userHasAccount) {
            const searchIspDb = await this.ispDbService.findByEmail(this.userEmail)
            const searchAdminDb = await this.adminDbService.findByEmail(this.userEmail)

            if (searchIspDb != null) return searchIspDb
            if (searchAdminDb != null) return searchAdminDb
        } else throw new TRPCError({ code: "NOT_FOUND", message: "User has no account" })
    }
}