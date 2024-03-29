import { api } from "~/utils/api"
import HomeButton from "../../../styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { formatDate, mapContractStatus } from "~/utils/functions/ispFunctions"
import { useState } from "react"
import ApproveContractModal from "~/styles/styledComponents/modals/ApproveContractModal"
import DenyContractModal from "~/styles/styledComponents/modals/DenyContractModal"
import NoContractModal from "~/styles/styledComponents/modals/NoContractModal"
import { entityMap } from "~/utils/functions/adminFunctions"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Underline from "~/styles/styledComponents/shared/Underline"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"

const Contracts: React.FC = () => {
  const [approveContractModalIsOpen, setApproveContractModalIsOpen] = useState(false)
  const [denyContractModalIsOpen, setDenyContractModalIsOpen] = useState(false)
  const [noContractModalIsOpen, setNoContractModalIsOpen] = useState(false)
  const [allContractsCurrentPage, allContractsSetCurrentPage] = useState(1)
  const [allContractsItemsPerPage, allContractsSetItemsPerPage] = useState(5)
  const [pendingContractsCurrentPage, pendingContractsSetCurrentPage] = useState(1)
  const [pendingContractsItemsPerPage, pendingContractsSetItemsPerPage] = useState(5)

  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const pendingContracts = api.admin.getPendingContracts.useQuery()
  const allContracts = api.admin.getAllContracts.useQuery()
  const approveContract = api.admin.approveContract.useMutation()
  const denyContract = api.admin.denyContract.useMutation()

  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (allContracts.isLoading) return <LoadingComponent locale={locale} />
  if (pendingContracts.isLoading) return <LoadingComponent locale={locale} />
  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (!allContracts.data) return <ErrorMessageComponent locale={locale} />
  if (!pendingContracts.data) return <ErrorMessageComponent locale={locale} />

  const paginateAllContracts = paginateData(allContracts.data, allContractsItemsPerPage, allContractsCurrentPage, allContractsSetCurrentPage, allContractsSetItemsPerPage)
  const currentAllContracts = allContracts.data.slice(
    (allContractsCurrentPage - 1) * allContractsItemsPerPage,
    allContractsCurrentPage * allContractsItemsPerPage
  )

  const paginatePendingContracts = paginateData(pendingContracts.data, pendingContractsItemsPerPage, pendingContractsCurrentPage, pendingContractsSetCurrentPage, pendingContractsSetItemsPerPage)
  const currentPendingContracts = pendingContracts.data.slice(
    (pendingContractsCurrentPage - 1) * pendingContractsItemsPerPage,
    pendingContractsCurrentPage * pendingContractsItemsPerPage
  )

  const handleApproveContract = (contractId: string) => {
    if (contractId === "NONE") {
      setNoContractModalIsOpen(true)
    } else {
      setApproveContractModalIsOpen(true)
      approveContract.mutate({ contractId })
    }
  }

  const handleDenyContract = (contractId: string) => {
    if (contractId === "NONE") {
      setNoContractModalIsOpen(true)
    } else {
      setDenyContractModalIsOpen(true)
      denyContract.mutate({ contractId })
    }
  }

  const renderPendingContracts = () => {
    return currentPendingContracts.map((contract, index) => (
      <div key={index} className="p-4 shadow hover:bg-gray-200">
        <h3 className="text-ivtcolor2 font-semibold mb-1">{t.t("Contract")} {index + 1}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Internet Provider")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.isp === "NONE" ? "-" : contract.isp}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("School")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.schoolsId === "NONE" ? "-" : contract.schoolsId}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Status")}</h4>
            <Underline />
            <p className="text-gray-900">{t.t(mapContractStatus(contract.status))}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Created At")}</h4>
            <Underline />
            <p className="text-gray-900">{formatDate(String(contract.createdAt))}</p>
          </div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <button
              onClick={() => handleApproveContract(contract.contractId)}
              className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
            >
              {t.t("Approve")}
            </button>
            <button
              onClick={() => handleDenyContract(contract.contractId)}
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full"
            >
              {t.t("Deny")}
            </button>
          </div>
        </div>
      </div>
    ))
  }

  const renderAllContracts = () => {
    return currentAllContracts.map((contract, index) => (
      <div key={index} className="p-4 shadow hover:bg-gray-200">
        <h3 className="text-ivtcolor2 font-semibold mb-1">{t.t("Contract")} {index + 1}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-1">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Internet Provider")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.isp === "NONE" ? "-" : contract.isp}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("School")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.schoolsId === "NONE" ? "-" : contract.schoolsId}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">Status</h4>
            <Underline />
            <p className="text-gray-900">{contract.status === "NONE" ? "-" : t.t(mapContractStatus(contract.status))}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Created At")}</h4>
            <Underline />
            <p className="text-gray-900">{formatDate(String(contract.createdAt))}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Reviewed By")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.adminName === "NONE" || contract.status === "PENDING" ? "-" : contract.adminName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Reviewer Team")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.adminTeam === "NONE" || contract.status === "PENDING" ? "-" : entityMap(contract.adminTeam)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="text-ivtcolor2 font-semibold">{t.t("Reviewed At")}</h4>
            <Underline />
            <p className="text-gray-900">{contract.reviewedAt === "NONE" || contract.status === "PENDING" ? "-" : formatDate(String(contract.reviewedAt))}</p>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <>
      {approveContractModalIsOpen && (
        <ApproveContractModal closeModal={() => setApproveContractModalIsOpen(false)} locale={locale} />
      )}
      {denyContractModalIsOpen && (
        <DenyContractModal closeModal={() => setDenyContractModalIsOpen(false)} locale={locale} />
      )}
      {noContractModalIsOpen && (
        <NoContractModal closeModal={() => setNoContractModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("Contracts")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8 w-full rounded bg-white border">
          <h2 className="p-2 text-ivtcolor2 font-bold text-2xl">{t.t("Pending Contracts")}</h2>
          {renderPendingContracts()}
          <Paginate totalPage={paginatePendingContracts.totalPage} itemsPerPage={pendingContractsItemsPerPage} currentPage={pendingContractsCurrentPage} goToPage={paginatePendingContracts.goToPage} previousPage={paginatePendingContracts.previousPage} nextPage={paginatePendingContracts.nextPage} setCurrentPage={pendingContractsSetCurrentPage} setItemsPerPage={pendingContractsSetItemsPerPage} />
        </div>
        <div className="mt-8 w-full rounded bg-white border">
          <h2 className="p-2 text-ivtcolor2 font-bold text-2xl">{t.t("Contracts")}</h2>
          {renderAllContracts()}
          <Paginate totalPage={paginateAllContracts.totalPage} itemsPerPage={allContractsItemsPerPage} currentPage={allContractsCurrentPage} goToPage={paginateAllContracts.goToPage} previousPage={paginateAllContracts.previousPage} nextPage={paginateAllContracts.nextPage} setCurrentPage={allContractsSetCurrentPage} setItemsPerPage={allContractsSetItemsPerPage} />
        </div>
      </div>
    </>
  )
}

export default Contracts
