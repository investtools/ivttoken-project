import { api } from "~/utils/api"
import HomeButton from "../../../styles/styledComponents/utils/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/utils/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/utils/Loading"
import PageHeader from "~/styles/styledComponents/utils/PageHeader"
import { administratorNameMapping } from "~/utils/functions/adminFunctions"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Paginate from "~/styles/styledComponents/utils/Paginate/Paginate"
import { useState } from "react"
import { paginateData } from "~/styles/styledComponents/utils/Paginate/paginateData"
import Filter from "~/styles/styledComponents/utils/Filter"

const SchoolCatalog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [search, setSearch] = useState("")
  const [filterOption, setFilterOption] = useState<SchoolKeys>('name')
  type SchoolKeys = 'name' | 'state' | 'city' | 'zipCode'

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const { data, isLoading } = api.schools.getAll.useQuery()

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const filteredItems = currentItems.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <PageHeader title={t.t("School Catalog")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8">
        </div>
        <div className="bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 className="bg-white p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{t.t("School Catalog")}</h2>
          <Filter filterOption={filterOption} setFilterOption={setFilterOption} search={search} setSearch={setSearch} />
          <div className="overflow-x-auto">
            <table className="w-9/10 mx-auto min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-center bg-gray-200 text-ivtcolor2 border">
                  <th className="p-2">{t.t("School's Name")}</th>
                  <th className="p-2">{t.t("State")}</th>
                  <th className="p-2">{t.t("City")}</th>
                  <th className="p-2">{t.t("Zip Code")}</th>
                  <th className="p-2">{t.t("Address")}</th>
                  <th className="p-2">{t.t("CNPJ")}</th>
                  <th className="p-2">{t.t("Inep Code")}</th>
                  <th className="p-2">{t.t("Administrator")}</th>
                  <th className="p-2">{t.t("E-Mail")}</th>
                  <th className="p-2">{t.t("Tokens")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((school) => (
                  <tr key={school.cnpj} className="bg-white text-ivtcolor2 text-center hover:bg-gray-200">
                    <td className="p-2 border">{school.name}</td>
                    <td className="p-2 border">{school.state}</td>
                    <td className="p-2 border">{school.city}</td>
                    <td className="p-2 border">{school.zipCode}</td>
                    <td className="p-2 border">{school.address}</td>
                    <td className="p-2 border">{school.cnpj}</td>
                    <td className="p-2 border">{school.inepCode}</td>
                    <td className="p-2 border">{t.t(administratorNameMapping(school.administrator))}</td>
                    <td className="p-2 border">{school.email}</td>
                    <td className="p-2 border">{school.tokens}</td>
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

export default SchoolCatalog
