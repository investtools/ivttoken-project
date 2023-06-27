import { api } from "~/utils/api"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { useState } from "react"
import { formatDate } from "~/utils/functions/ispFunctions"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ApprovedModal from "~/styles/styledComponents/modals/ApprovedModal"
import NothingToApproveModal from "~/styles/styledComponents/modals/NothingToApprove"

const ApproveISP: React.FC = () => {
  const [approvedModalIsOpen, setApprovedModalIsOpen] = useState(false)
  const [nothingToApproveModalIsOpen, setNothingToApproveModalIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const { mutate } = api.admin.approveISP.useMutation()
  const { data, isLoading } = api.internetServiceProviders.getIspToBeApproved.useQuery()

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleClick = (email: string) => {
    if (email) {
      if (email === "-") {
        return setNothingToApproveModalIsOpen(true)
      }
      try {
        mutate({ email })
        setApprovedModalIsOpen(true)
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }

  const renderTable = () => {
    return (
      <>
        <div className="overflow-x-auto ">
          <table className="w-9/10 mx-auto min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-center bg-gray-200">
                <th className="p-2 border text-ivtcolor2">{t.t("Name")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("E-Mail")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("CNPJ")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Created At")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Approve")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((isp) => (
                <tr key={isp.cnpj} className="bg-white text-center hover:bg-gray-200">
                  <td className="p-2 border text-ivtcolor2">{isp.name}</td>
                  <td className="p-2 border text-ivtcolor2">{isp.email}</td>
                  <td className="p-2 border text-ivtcolor2">{isp.cnpj}</td>
                  <td className="p-2 border text-ivtcolor2">{isp.createdAt === "-" ? "-" : formatDate(String(isp.createdAt))}</td>
                  <td className="p-2 border text-ivtcolor2">
                    <button
                      onClick={() => handleClick(isp.email)}
                      className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
                    >
                      {t.t("Approve")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginate totalPage={totalPage} itemsPerPage={itemsPerPage} currentPage={currentPage} goToPage={goToPage} previousPage={previousPage} nextPage={nextPage} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />
      </>
    )
  }

  return (
    <>
      {approvedModalIsOpen && (
        <ApprovedModal title={"isp"} closeModal={() => setApprovedModalIsOpen(false)} locale={locale} />
      )}
      {nothingToApproveModalIsOpen && (
        <NothingToApproveModal title={"isp"} closeModal={() => setNothingToApproveModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("Approve Provider")} />
      <div className="p-8">
        <HomeButton />
        <div className="shadow overflow-hidden bg-white border-b border-gray-200 sm:rounded-lg mt-8">
          <div className="flex justify-between rounded">
            <h2 className="p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{t.t("Providers To Approve")}</h2>
          </div>
          {renderTable()}
        </div>
      </div>
    </>
  )
}

export default ApproveISP