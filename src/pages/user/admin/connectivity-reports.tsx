import { api } from "~/utils/api"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { administratorNameMapping } from "~/utils/functions/adminFunctions"
import { useRouter } from 'next/router'
import { Translate } from "translate/translate"
import { useState } from "react"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import Filter from "~/styles/styledComponents/shared/Filter"

const ConnectivityReports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [search, setSearch] = useState("")
  const [filterOption, setFilterOption] = useState<SchoolKeys>('name')
  type SchoolKeys = 'name' | 'state' | 'city' | 'zipCode'

  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const { data, isLoading } = api.schools.getAll.useQuery()

  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />

  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const handleSelectSchool = (email: string) => {
    void router.push(`/user/admin/connectivity-reports/school-reports?email=${email}`)
  }

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const filteredItems = search ? data.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase())) : currentItems.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <PageHeader title={t.t("Connectivity Reports")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8">
        </div>
        <div className="shadow bg-white border-b border-gray-200 rounded-lg">
          <h2 className="p-2 rounded-t drop-shadow-lg text-ivtcolor2 font-bold text-2xl">{t.t("Schools")}</h2>
          <Filter filterOption={filterOption} setFilterOption={setFilterOption} search={search} setSearch={setSearch} />
          <div className="overflow-x-auto">
            <table className="w-9/10 mx-auto min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-center bg-gray-200">
                  <th className="p-2 border text-ivtcolor2">{t.t("School's Name")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("State")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("City")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Zip Code")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Address")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Inep Code")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Administrator")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("E-Mail")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Tokens")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Reports")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("See Reports")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((school) => (
                  <tr key={school.id} className="bg-white text-center hover:bg-gray-200">
                    <td className="p-2 border text-ivtcolor2">{school.name}</td>
                    <td className="p-2 border text-ivtcolor2">{school.state}</td>
                    <td className="p-2 border text-ivtcolor2">{school.city}</td>
                    <td className="p-2 border text-ivtcolor2">{school.zipCode}</td>
                    <td className="p-2 border text-ivtcolor2">{school.address}</td>
                    <td className="p-2 border text-ivtcolor2">{school.inepCode}</td>
                    <td className="p-2 border text-ivtcolor2">{t.t(administratorNameMapping(school.administrator))}</td>
                    <td className="p-2 border text-ivtcolor2">{school.email}</td>
                    <td className="p-2 border text-ivtcolor2">{school.tokens}</td>
                    <td className="p-2 border text-ivtcolor2">{school.connectivityReport.length}</td>
                    <td className="p-2 border text-ivtcolor2">
                      <button onClick={() => handleSelectSchool(school.email)} className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full">
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
