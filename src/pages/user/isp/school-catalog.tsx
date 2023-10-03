import { api } from "~/utils/api"
import HomeButton from "../../../styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import { useState } from "react"
import { administratorNameMapping } from "~/utils/functions/adminFunctions"
import { Translate } from "translate/translate"
import { useRouter } from "next/router"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import SwitchCatalog from "~/styles/styledComponents/shared/SwitchCatalog"
import Filter from "~/styles/styledComponents/shared/Filter"
import dynamic from 'next/dynamic'
const SchoolMap = dynamic(() => import("~/styles/styledComponents/shared/SchoolMap"), { ssr: false })

const SchoolCatalog: React.FC = () => {
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [filterOption, setFilterOption] = useState<SchoolKeys>('name')
  type SchoolKeys = 'name' | 'state' | 'city' | 'zipCode'

  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const isIsp = api.internetServiceProviders.isIsp.useQuery()
  const { data, isLoading } = api.schools.getAvailable.useQuery()

  if (isIsp.data == false) return <ErrorMessageComponent locale={locale} />
  if (isIsp.isLoading) return <LoadingComponent locale={locale} />
  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const handleClick = (email: string) => {
    if (email) {
      try {
        void router.push(`/user/isp/contract?email=${email}`)
      } catch (error) {
        console.log(error)
        return null
      }
    } else {
      setIncompleteFieldsModalIsOpen(true)
    }
  }

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const renderTable = () => {
    const filteredItems = search ? data.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase())) : currentItems.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase()))

    return (
      <>
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
                <th className="p-2 border text-ivtcolor2">{t.t("Select")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((school) => (
                <tr key={school.email} className="bg-white text-center hover:bg-gray-200">
                  <td className="p-2 border text-ivtcolor2">{school.name}</td>
                  <td className="p-2 border text-ivtcolor2">{school.state}</td>
                  <td className="p-2 border text-ivtcolor2">{school.city}</td>
                  <td className="p-2 border text-ivtcolor2">{school.zipCode}</td>
                  <td className="p-2 border text-ivtcolor2">{school.address}</td>
                  <td className="p-2 border text-ivtcolor2">{school.inepCode}</td>
                  <td className="p-2 border text-ivtcolor2">{t.t(administratorNameMapping(school.administrator))}</td>
                  <td className="p-2 border text-ivtcolor2">{school.email}</td>
                  <td className="p-2 border text-ivtcolor2">{school.tokens}</td>
                  <td className="p-2 border text-ivtcolor2">
                    <button
                      onClick={() => handleClick(school.email)}
                      className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
                    >
                      {t.t("Contract")}
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
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeIncompleteFieldModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("School Catalog")} />
      <div className="p-8">
        <HomeButton />
        <div className="shadow overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-8">
          <div className="flex justify-between rounded">
            <h2 className="p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{t.t("School Catalog")}</h2>
            <div className="flex mr-2">
              <SwitchCatalog setShowMap={setShowMap} />
            </div>
          </div>
          {showMap ? (<SchoolMap schools={data} locale={locale} showContractButton={true} />) : renderTable()}
        </div>
      </div>
    </>
  )
}

export default SchoolCatalog
