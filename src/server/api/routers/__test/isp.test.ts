import { expect } from "@jest/globals"
import { appRouter } from "../../root"
import { ispContextCaller, ispContextSession } from "./ctx"
import { prisma } from "~/server/db"

describe('Internet Service Provider Tests', () => {
    const caller = appRouter.createCaller({ session: ispContextSession, prisma })
    if (ispContextCaller.emailAddresses[0] === null || ispContextCaller.emailAddresses[0] === undefined) return new Error()
    const ispEmail = String(ispContextSession.user.email)

    it('Should return false before creating ISP and true after', async () => {
        expect(await caller.internetServiceProviders.isIsp()).toEqual(false) // returns false bc isp doesn't exist yet

        await caller.internetServiceProviders.registerISP({ name: "test", cnpj: "ispCnpjTest" }) // register isp

        expect(await caller.internetServiceProviders.isIsp()).toEqual(true) // returns true bc isp exists now

        await prisma.internetServiceProvider.delete({ where: { email: ispEmail } }) // delete isp

        expect(await caller.internetServiceProviders.isIsp()).toEqual(false) // returns false bc isp no longer exists
    })

    it('Should test ISP balance', async () => {
        await caller.internetServiceProviders.registerISP({ name: "test", cnpj: "ispCnpjTest" }) // register isp

        const ispBalance = await caller.internetServiceProviders.getIspData() // get isp balance data

        expect(ispBalance.spentTokens).toStrictEqual("0")
        expect(ispBalance.tokenAmount).toStrictEqual("0")
        expect(ispBalance.lockedTokens).toStrictEqual("0")
        expect(ispBalance.tokensHistory).toStrictEqual("0")
        expect(ispBalance.unlockedTokens).toStrictEqual("0")

        await prisma.internetServiceProvider.delete({ where: { email: ispEmail } }) // delete isp
    })

    it('Should test ISP buy benefits and see transaction history', async () => {
        await caller.internetServiceProviders.registerISP({ name: "test", cnpj: "ispCnpjTest" }) // register isp

        const ispTransactions = await caller.internetServiceProviders.getIspTransactions() // get isp transaction history
        expect(ispTransactions[0]?.benefit).toStrictEqual("NONE") // expect that there is none benefits

        await prisma.internetServiceProvider.update({ where: { email: ispEmail }, data: { unlockedTokens: "500" } }) // giving tokens to isp buy benefit

        const ispBalance = await caller.internetServiceProviders.getIspData() // get isp balance data
        expect(ispBalance.unlockedTokens).toStrictEqual("500") // expect that tokens has been successfully unlocked

        await caller.internetServiceProviders.buyBenefits({ selectedBenefit: "TAX_BREAK" }) // buying tax break

        const ispTransactionsAfterBuy = await caller.internetServiceProviders.getIspTransactions() // get isp transaction history again
        expect(ispTransactionsAfterBuy[0]?.benefitPrice).toStrictEqual("500") // expect that transaction history shows the benefit price
        expect(ispTransactionsAfterBuy[0]?.benefit).toStrictEqual("TAX_BREAK") // expect that transaction history shows the benefit

        await prisma.tokenTransactions.delete({ where: { id: ispTransactionsAfterBuy[0]?.id } }) // delete token transaction
        await prisma.internetServiceProvider.delete({ where: { email: ispEmail } }) // delete isp
    })
})
