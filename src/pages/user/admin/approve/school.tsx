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
import { administratorNameMapping } from "~/utils/functions/adminFunctions"
import Filter from "~/styles/styledComponents/shared/Filter"
import DenyModal from "~/styles/styledComponents/modals/DeniedModal"

type SchoolData = {
  name: string,
  state: string,
  city: string,
  zipCode: string,
  address: string,
  inepCode: string,
  administrator: string,
  email: string,
  id: string,
  createdAt: string
}

const ApproveISP: React.FC = () => {
  const [deniedModalIsOpen, setDeniedModalIsOpen] = useState(false)
  const [approvedModalIsOpen, setApprovedModalIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [nothingToApproveModalIsOpen, setNothingToApproveModalIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [filterOption, setFilterOption] = useState<SchoolKeys>('name')
  type SchoolKeys = 'name' | 'state' | 'city' | 'zipCode'

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const approve = api.admin.approveSchool.useMutation()
  const deny = api.admin.denySchool.useMutation()
  const { data, isLoading } = api.schools.getSchoolsToBeApproved.useQuery()

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const mapData: SchoolData[] = []
  for (const dt of data) {
    const add = {
      name: dt.name,
      state: dt.state,
      city: dt.city,
      zipCode: dt.zipCode,
      address: dt.address,
      inepCode: dt.inepCode,
      administrator: dt.administrator,
      email: dt.email,
      id: dt.id,
      createdAt: String(dt.createdAt)
    }
    mapData.push(add)
  }

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(mapData, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = mapData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleApprove = (pendingSchoolId: string) => {
    if (pendingSchoolId) {
      if (pendingSchoolId === "-") {
        return setNothingToApproveModalIsOpen(true)
      }
      try {
        approve.mutate({ schoolId: pendingSchoolId })
        setApprovedModalIsOpen(true)
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }

  const handleDeny = (pendingSchoolId: string) => {
    if (pendingSchoolId) {
      if (pendingSchoolId === "-") return setNothingToApproveModalIsOpen(true)
      try {
        deny.mutate({ schoolId: pendingSchoolId })
        setDeniedModalIsOpen(true)
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }

  const renderTable = () => {
    const filteredItems = search ? mapData.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase())) : currentItems.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase()))

    return (
      <>
        <Filter filterOption={filterOption} setFilterOption={setFilterOption} search={search} setSearch={setSearch} />
        <div className="overflow-x-auto ">
          <table className="w-9/10 mx-auto min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-center bg-gray-200">
                <th className="p-2 border text-ivtcolor2">{t.t("Name")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("E-Mail")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("State")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("City")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Address")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Zip Code")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Administrator")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Created At")}</th>
                <th className="p-2 border text-ivtcolor2">{t.t("Approve")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((school) => (
                <tr key={school.id} className="bg-white text-center hover:bg-gray-200">
                  <td className="p-2 border text-ivtcolor2">{school.name}</td>
                  <td className="p-2 border text-ivtcolor2">{school.email}</td>
                  <td className="p-2 border text-ivtcolor2">{school.state}</td>
                  <td className="p-2 border text-ivtcolor2">{school.city}</td>
                  <td className="p-2 border text-ivtcolor2">{school.address}</td>
                  <td className="p-2 border text-ivtcolor2">{school.zipCode}</td>
                  <td className="p-2 border text-ivtcolor2">{t.t(administratorNameMapping(school.administrator))}</td>
                  <td className="p-2 border text-ivtcolor2">{school.createdAt === "-" ? "-" : formatDate(String(school.createdAt))}</td>
                  <td className="p-2 border text-ivtcolor2">
                    <div className="space-x-2">
                      <button onClick={() => handleApprove(school.id)} className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full">
                        {t.t("Approve")}
                      </button>
                      <button onClick={() => handleDeny(school.id)} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                        {t.t("Deny")}
                      </button>
                    </div>
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
      {deniedModalIsOpen && (
        <DenyModal title={"school"} closeModal={() => setDeniedModalIsOpen(false)} locale={locale} />
      )}
      {approvedModalIsOpen && (
        <ApprovedModal title={"school"} closeModal={() => setApprovedModalIsOpen(false)} locale={locale} />
      )}
      {nothingToApproveModalIsOpen && (
        <NothingToApproveModal title={"school"} closeModal={() => setNothingToApproveModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("Approve School")} />
      <div className="p-8">
        <HomeButton />
        <div className="shadow overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-8">
          <div className="flex justify-between rounded">
            <h2 className="p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{t.t("Schools To Approve")}</h2>
          </div>
          {renderTable()}
        </div>
      </div>
    </>
  )
}

export default ApproveISP