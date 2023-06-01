// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ethers } from "ethers"
import { calcGas } from "./calcGas"
import { multiSigAbi } from "./multiSigAbi.cjs"
import { signMessages } from "./signing-utils.cjs"
import * as dotenv from "dotenv"
dotenv.config()

export async function signTransaction(signer1pk, signer2pk, signer3pk, ispWallet, tokenAmount) {
    const provider = new ethers.providers.AlchemyProvider(process.env.PROVIDER_NETWORK, process.env.PROVIDER_API_KEY)
    const wallet1 = new ethers.Wallet(signer1pk, provider)
    const wallet2 = new ethers.Wallet(signer2pk, provider)
    const wallet3 = new ethers.Wallet(signer3pk, provider)
    const multisig = new ethers.Contract(process.env.MULTISIG_CONTRACT_ADDRESS, multiSigAbi, wallet1)

    const abi = ["function increaseUnlockedTokens(address _recipient, uint _amount)"]
    const iface = new ethers.utils.Interface(abi)
    const callData = iface.encodeFunctionData("increaseUnlockedTokens", [ispWallet, tokenAmount])

    const nonce = ethers.utils.hexlify(ethers.utils.randomBytes(32))
    const params = {
        to: process.env.CONTRACT_ADDRESS,
        value: "0",
        data: ethers.utils.hexlify(callData),
        nonce: nonce
    }

    const signatures = await signMessages([wallet1, wallet2, wallet3], process.env.MULTISIG_CONTRACT_ADDRESS, params)
    const gasEstimated = await multisig.estimateGas.executeTransaction(...signatures, params.to, params.value, params.data, params.nonce)
    const gasPrice = await calcGas(gasEstimated)
    const multisigTx = await multisig.executeTransaction(...signatures, params.to, params.value, params.data, params.nonce, { gasPrice })
    const transactionHash = multisigTx.hash
    return transactionHash
}
