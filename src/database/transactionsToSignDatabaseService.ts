import { prisma } from "./prisma"

export class TransactionsToSignDatabaseService {
    db
    constructor() {
        this.db = prisma.transactionsToSign
    }

    create(transactionHash: string, signatures: string[], contractId: string) {
        return this.db.create({
            data: {
                transactionHash,
                signatures,
                contractId
            }
        })
    }

    loadAllTransactions() {
        return this.db.findMany()
    }

    update(transactionHash: string, signatures: object) {
        return this.db.update({
            where: {
                transactionHash
            },
            data: {
                signatures
            }
        })
    }

    delete(transactionHash: string) {
        return this.db.delete({
            where: {
                transactionHash
            }
        })
    }

    loadTransactionByHash(transactionHash: string) {
        return this.db.findUniqueOrThrow({
            where: {
                transactionHash
            }
        })
    }
}