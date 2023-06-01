import { InternetServiceProviderDatabaseService } from "~/database/internetServiceProviderDatabaseService"
import { type CreateInternetServiceProvider } from "./interfaces/interfaces"
import { Role } from "@prisma/client"

export class InternetServiceProviderService {
    private readonly ispDbService: InternetServiceProviderDatabaseService

    constructor() {
        this.ispDbService = new InternetServiceProviderDatabaseService()
    }

    public async create(data: CreateInternetServiceProvider) {
        data.role = Role.ISP
        return await this.ispDbService.create(data.name, data.cnpj, data.tokenAmount, data.unlockedTokens, data.lockedTokens, data.spentTokens, data.email, data.role)
    }

    public async findByCnpj(cnpj: string) {
        return await this.ispDbService.findByCnpj(cnpj)
    }

    public async findById(id: string) {
        return await this.ispDbService.findById(id)
    }

    public async searchById(id: string) {
        return await this.ispDbService.searchById(id)
    }

    public async ispId(cnpj: string) {
        return (await this.findByCnpj(cnpj)).id
    }

    public async findByEmail(email: string) {
        return await this.ispDbService.findByEmail(email)
    }

    public async searchByEmail(email: string) {
        return await this.ispDbService.searchByEmail(email)
    }

    public async balance(cnpj: string) {
        const isp = await this.findByCnpj(cnpj)
        return {
            tokenAmount: isp.tokenAmount,
            unlockedTokens: isp.unlockedTokens,
            lockedTokens: isp.lockedTokens,
            spentTokens: isp.spentTokens
        }
    }

    public async ispSchools(cnpj: string) {
        const isp = await this.findByCnpj(cnpj)
        return isp.schools
    }

    public async ispContracts(cnpj: string) {
        const isp = await this.findByCnpj(cnpj)
        if (isp.contracts.length == 0) {
            return "Este provedor não tem contrato com nenhuma escola"
        }
        return isp.contracts
    }

    public async ispTokenTransactions(cnpj: string) {
        const isp = await this.findByCnpj(cnpj)
        if (isp.tokenTransactions.length == 0) {
            return "Este provedor ainda não fez nenhuma transação"
        }
        return isp.tokenTransactions
    }

    public async spendTokens(cnpj: string, tokensToSpend: string) {
        const isp = await this.findByCnpj(cnpj)

        if (Number(isp.unlockedTokens) < Number(tokensToSpend)) {
            return false
        }

        const spentTokens = Number(isp.spentTokens) + Number(tokensToSpend)
        await this.ispDbService.spentTokens(cnpj, String(spentTokens))

        const newUnlockedTokensBalance = Number(isp.unlockedTokens) - Number(tokensToSpend)
        await this.ispDbService.updateUnlockedTokens(cnpj, String(newUnlockedTokensBalance))

        const newTotalTokensAmountBalance = Number(isp.tokenAmount) - Number(tokensToSpend)
        await this.ispDbService.updateTotalTokensAmount(cnpj, String(newTotalTokensAmountBalance))

        return this.balance(cnpj)
    }

    public async ispHasAccount(email: string) {
        return (await this.findByEmail(email)) == null ? false : true
    }
}