import { api } from "~/utils/api"
import HomeButton from "../../../styles/styledComponents/utils/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/utils/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/utils/Loading"
import PageHeader from "~/styles/styledComponents/utils/PageHeader"
import { formatDate } from "~/utils/functions/ispFunctions"
import { useState } from "react"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Underline from "~/styles/styledComponents/utils/Underline"
import NoTransactionModal from "~/styles/styledComponents/modals/NoTransactionModal"
import FailedToSignTransactionModal from "~/styles/styledComponents/modals/FailSignTransactionModal"

const UnlockIspTokens: React.FC = () => {
  const [noTransactionsModalIsOpen, setNoTransactionsModalIsOpen] = useState(false)
  const [failToSignTransactionsModalIsOpen, setFailToSignTransactionsModalIsOpen] = useState(false)

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const pendingTransactions = api.admin.getAllTransactionsToSign.useQuery()
  const signTransaction = api.admin.signTransaction.useMutation()

  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (pendingTransactions.isLoading) return <LoadingComponent locale={locale} />

  const handleSign = (transactionHash: string) => {
    if (transactionHash === "-") {
      setNoTransactionsModalIsOpen(true)
    } else {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accounts: string[]) => {
            const account = accounts[0]
            const message = `Sign this transaction: ${transactionHash}`
            if (typeof window.ethereum === "undefined") return new Error()
            return window.ethereum.request({
              method: 'personal_sign',
              params: [message, account],
            })
          })
          .then((signature: string) => {
            signTransaction.mutate({ transactionHash, privateKey: signature })
            window.location.reload()
          })
          .catch(() => {
            setFailToSignTransactionsModalIsOpen(true)
          })
      } else {
        setFailToSignTransactionsModalIsOpen(true)
      }
    }
  }

  const handleSeeReports = (cnpj: string) => {
    if (cnpj === "-") {
      setNoTransactionsModalIsOpen(true)
    } else {
      void router.push(`/user/admin/connectivity-reports/school-reports?cnpj=${cnpj}`)
    }
  }

  const renderPendingTransactions = () => {
    return pendingTransactions.data?.map((transaction, index) => (
      <div key={index} className="p-4 shadow">
        <h3 className="text-ivtcolor2 font-semibold mb-1">{t.t("Transaction")} {index + 1}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Internet Provider")}</h4>
            <Underline />
            <p className="text-gray-900">{transaction.ispName === "-" ? "-" : transaction.ispName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("School")}</h4>
            <Underline />
            <p className="text-gray-900">{transaction.schoolName === "-" ? "-" : transaction.schoolName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Signatures")}</h4>
            <Underline />
            <p className="text-gray-900">{transaction.signatures === "-" ? "-" : transaction.signatures}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Created At")}</h4>
            <Underline />
            <p className="text-gray-900">{transaction.createdAt === "-" ? "-" : formatDate(String(transaction.createdAt))}</p>
          </div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <button
              onClick={() => handleSign(transaction.txHash)}
              className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
            >
              {t.t("Sign")}
            </button>
            <button
              onClick={() => handleSeeReports(transaction.schoolCnpj)}
              className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
            >
              {t.t("Reports")}
            </button>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <>
      {noTransactionsModalIsOpen && (
        <NoTransactionModal closeModal={() => setNoTransactionsModalIsOpen(false)} locale={locale} />
      )}
      {failToSignTransactionsModalIsOpen && (
        <FailedToSignTransactionModal closeModal={() => setFailToSignTransactionsModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("Unlock ISP Tokens")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8 w-full rounded bg-white">
          <h2 className="p-2 text-ivtcolor2 font-bold text-2xl">{t.t("Pending Transactions")}</h2>
          {renderPendingTransactions()}
        </div>
      </div>
    </>
  )
}

export default UnlockIspTokens