import { prisma } from "./prisma.js"

export class SignedTransactionsDatabaseService {
    db
    constructor() {
        this.db = prisma.signedTransactions
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
}