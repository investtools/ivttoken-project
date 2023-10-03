import { api } from "~/utils/api"
import HomeButton from "../../../styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import { useState } from "react"
import { formatDate, mapUserRole } from "~/utils/functions/ispFunctions"
import { entityMap } from "~/utils/functions/adminFunctions"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"

const AuthorizedUsers: React.FC = () => {
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const { data, isLoading } = api.admin.getAuthorizedUsers.useQuery()

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeIncompleteFieldModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("Authorized Users")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8">
        </div>
        <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
          <h2 className="p-2 border-t drop-shadow-lg text-ivtcolor2 font-bold text-2xl">{t.t("Authorized Users")}</h2>
          <div className="overflow-x-auto">
            <table className="mx-auto min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-center bg-gray-200">
                  <th className="p-2 border text-ivtcolor2">{t.t("E-mail")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Role")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Authorized By")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Team")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Authorized At")}</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((authorizedUser) => (
                  <tr key={authorizedUser.id} className="text-center hover:bg-gray-200">
                    <td className="p-2 border text-ivtcolor2">{authorizedUser.email}</td>
                    <td className="p-2 border text-ivtcolor2">{t.t(mapUserRole(authorizedUser.role))}</td>
                    <td className="p-2 border text-ivtcolor2">{authorizedUser.adminName}</td>
                    <td className="p-2 border text-ivtcolor2">{entityMap(authorizedUser.adminTeam)}</td>
                    <td className="p-2 border text-ivtcolor2">{formatDate(String(authorizedUser.createdAt))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate totalPage={totalPage} itemsPerPage={itemsPerPage} currentPage={currentPage} goToPage={goToPage} previousPage={previousPage} nextPage={nextPage} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />
        </div>
      </div>
    </>
  )
}

export default AuthorizedUsers
