import { api } from "~/utils/api"
import HomeButton from "~/styles/styledComponents/utils/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/utils/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/utils/Loading"
import PageHeader from "~/styles/styledComponents/utils/PageHeader"
import { administratorNameMapping } from "~/utils/functions/adminFunctions"
import { useRouter } from 'next/router'
import { Translate } from "translate/translate"
import { useState } from "react"
import { paginateData } from "~/styles/styledComponents/utils/Paginate/paginateData"
import Paginate from "~/styles/styledComponents/utils/Paginate/Paginate"

const ConnectivityReports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const { data, isLoading } = api.schools.getAll.useQuery()

  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />

  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const handleSelectSchool = (cnpj: string) => {
    void router.push(`/user/admin/connectivity-reports/school-reports?cnpj=${cnpj}`)
  }

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  return (
    <>
      <PageHeader title={t.t("Connectivity Reports")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8">
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <h2 className="bg-white p-2 rounded-t drop-shadow-lg text-ivtcolor2 font-bold text-2xl">{t.t("Schools")}</h2>
          <div className="overflow-x-auto">
            <table className="w-9/10 mx-auto min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-center bg-gray-200">
                  <th className="p-2 border text-ivtcolor2">{t.t("School's Name")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("State")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("City")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Zip Code")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Address")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Cnpj")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Inep Code")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Administrator")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("E-Mail")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Tokens")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Reports")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("See Reports")}</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((school) => (
                  <tr key={school.cnpj} className="bg-white text-center">
                    <td className="p-2 border text-ivtcolor2">{school.name}</td>
                    <td className="p-2 border text-ivtcolor2">{school.state}</td>
                    <td className="p-2 border text-ivtcolor2">{school.city}</td>
                    <td className="p-2 border text-ivtcolor2">{school.zipCode}</td>
                    <td className="p-2 border text-ivtcolor2">{school.address}</td>
                    <td className="p-2 border text-ivtcolor2">{school.cnpj}</td>
                    <td className="p-2 border text-ivtcolor2">{school.inepCode}</td>
                    <td className="p-2 border text-ivtcolor2">{t.t(administratorNameMapping(school.administrator))}</td>
                    <td className="p-2 border text-ivtcolor2">{school.email}</td>
                    <td className="p-2 border text-ivtcolor2">{school.tokens}</td>
                    <td className="p-2 border text-ivtcolor2">{school.connectivityReport.length}</td>
                    <td className="p-2 border text-ivtcolor2">
                      <button
                        onClick={() => handleSelectSchool(school.cnpj)}
                        className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
                      >
                        {t.t("Reports")}
                      </button>
                    </td>
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

export default ConnectivityReports
