import { type Benefits, Status, Role } from "@prisma/client"
import { prisma } from "./prisma"
import { getLatLon, mapAdministrator } from "~/utils/functions/adminFunctions"

export async function approveContractTransaction(adminId: string, schoolEmail: string, ispId: string, newTotalTokenAmount: string, newLockedTokens: string, contractId: string) {
    const relationSchoolWithISP = prisma.schools.update({
        where: {
            email: schoolEmail
        },
        data: {
            internetServiceProviderId: ispId
        }
    })

    const mintTokensToISP = prisma.internetServiceProvider.update({
        where: {
            id: ispId
        }, data: {
            lockedTokens: newLockedTokens,
            tokenAmount: newTotalTokenAmount
        }
    })

    const updateContractStatus = prisma.contracts.update({
        where: {
            id: contractId
        },
        data: {
            adminId,
            status: Status.APPROVED,
            updatedAt: new Date()
        }
    })

    return await prisma.$transaction([relationSchoolWithISP, updateContractStatus, mintTokensToISP])
}

export async function ispBuyBenefitsTransaction(ispCnpj: string, newSpentTokens: string, newUnlockedTokens: string, newTokenAmount: string, benefit: Benefits, benefitPrice: string, ispId: string) {
    const buyBenefit = prisma.internetServiceProvider.update({
        where: {
            cnpj: ispCnpj
        }, data: {
            spentTokens: newSpentTokens,
            unlockedTokens: newUnlockedTokens,
            tokenAmount: newTokenAmount
        }
    })

    const createTokenTransaction = prisma.tokenTransactions.create({
        data: {
            benefit,
            benefitPrice,
            internetServiceProviderId: ispId
        }
    })

    return await prisma.$transaction([buyBenefit, createTokenTransaction])
}

export async function databaseSendTxToBlockchain(transactionHash: string, contractId: string, signatures: string[]) {
    const deleteTxToSign = prisma.transactionsToSign.delete({
        where: {
            transactionHash
        }
    })

    const createSignedTransaction = prisma.signedTransactions.create({
        data: {
            transactionHash,
            signatures,
            contractId
        }
    })

    return await prisma.$transaction([deleteTxToSign, createSignedTransaction])
}

export async function unlockIspTokens(cnpj: string, tokensToUnlock: string) {
    const isp = await prisma.internetServiceProvider.findUniqueOrThrow({ where: { cnpj } })

    if (Number(tokensToUnlock) > Number(isp.lockedTokens)) return false

    const newUnlockedTokensBalance = String(Number(isp.unlockedTokens) + Number(tokensToUnlock))
    const newLockedTokensBalance = String(Number(isp.lockedTokens) - Number(tokensToUnlock))

    const unlockTokens = prisma.internetServiceProvider.update({
        where: {
            cnpj
        },
        data: {
            unlockedTokens: newUnlockedTokensBalance,
            lockedTokens: newLockedTokensBalance
        }
    })

    return await prisma.$transaction([unlockTokens])
}

export async function approveISP(email: string, adminId: string) {
    const authorizeUser = prisma.authorizedUsers.create({
        data: {
            email,
            role: Role.ISP,
            adminId
        }
    })

    const softDeletePendingISP = prisma.internetServiceProviderToBeApproved.update({
        where: {
            email
        },
        data: {
            deletedAt: new Date()
        }
    })

    return await prisma.$transaction([authorizeUser, softDeletePendingISP])
}

export async function approveSchool(pendingSchoolId: string) {
    const pendingSchool = await prisma.schoolsToBeApproved.findFirstOrThrow({
        where: {
            id: pendingSchoolId
        }
    })

    const latLon = await getLatLon(pendingSchool.city, pendingSchool.state, String(pendingSchool.address.split(',')[0]))
    const administrator = mapAdministrator(pendingSchool.administrator)

    const createSchool = prisma.schools.create({
        data: {
            name: pendingSchool.name,
            state: pendingSchool.state,
            city: pendingSchool.city,
            zipCode: pendingSchool.zipCode,
            address: pendingSchool.address,
            inepCode: pendingSchool.inepCode,
            email: pendingSchool.email,
            lat: String(latLon?.lat),
            lon: String(latLon?.lon),
            role: Role.SCHOOL,
            administrator: administrator
        }
    })

    const deletePendingSchool = prisma.schoolsToBeApproved.delete({
        where: {
            id: pendingSchoolId
        }
    })

    return await prisma.$transaction([createSchool, deletePendingSchool])
}