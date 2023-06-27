import { api } from "~/utils/api"
import { useState } from 'react'
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import FormSentModal from "~/styles/styledComponents/modals/FormSentModal"
import SendIcon from "~/styles/styledComponents/icons/SendIcon"
import { administratorNameMapping } from "~/utils/functions/adminFunctions"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { selectField } from "~/styles/styledComponents/shared/selectFieldForms"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import Filter from "~/styles/styledComponents/shared/Filter"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"

const AssignTokensSchool: React.FC = () => {
  const [cnpj, setCnpj] = useState('')
  const [name, setName] = useState('')
  const [tokens, setTokens] = useState('')
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [search, setSearch] = useState("")
  const [filterOption, setFilterOption] = useState<SchoolKeys>('name')
  type SchoolKeys = 'name' | 'state' | 'city' | 'zipCode'

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isAdmin = api.admin.isAdmin.useQuery()
  const { mutate } = api.admin.assignTokensToSchool.useMutation()
  const { data, isLoading } = api.schools.getNoTokensSchools.useQuery()

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />

  if (isLoading) return <LoadingComponent locale={locale} />
  if (!data) return <ErrorMessageComponent locale={locale} />

  const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const filteredItems = search ? data.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase())) : currentItems.filter(school => school[filterOption].toLowerCase().includes(search.toLowerCase()))

  const handleSubmit = (cnpj: string, tokens: string) => {
    if (cnpj && tokens) {
      try {
        setSentFormModalIsOpen(true)
        mutate({ cnpj, tokens })
      } catch (error) {
        console.log(error)
        return null
      }
    } else {
      setIncompleteFieldsModalIsOpen(true)
    }
  }

  const handleSelectSchool = (schoolName: string, cnpj: string) => {
    setCnpj(cnpj)
    setName(schoolName)
  }

  return (
    <>
      {sentFormModalIsOpen && (
        <FormSentModal closeModal={() => setSentFormModalIsOpen(false)} locale={locale} />
      )}
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      <PageHeader title={t.t("Assign Tokens")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8">
        </div>
        <div className="shadow bg-white border-b border-gray-200 sm:rounded-lg">
          <h2 className="p-2 rounded-t drop-shadow-lg text-ivtcolor2 font-bold text-2xl">{t.t("Schools Without Tokens")}</h2>
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
                  <th className="p-2 border text-ivtcolor2">{t.t("CNPJ")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Inep Code")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Administrator")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("E-Mail")}</th>
                  <th className="p-2 border text-ivtcolor2">{t.t("Select")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((school) => (
                  <tr key={school.cnpj} className="bg-white text-center hover:bg-gray-200">
                    <td className="p-2 border text-ivtcolor2">{school.name}</td>
                    <td className="p-2 border text-ivtcolor2">{school.state}</td>
                    <td className="p-2 border text-ivtcolor2">{school.city}</td>
                    <td className="p-2 border text-ivtcolor2">{school.zipCode}</td>
                    <td className="p-2 border text-ivtcolor2">{school.address}</td>
                    <td className="p-2 border text-ivtcolor2">{school.cnpj}</td>
                    <td className="p-2 border text-ivtcolor2">{school.inepCode}</td>
                    <td className="p-2 border text-ivtcolor2">{t.t(administratorNameMapping(school.administrator))}</td>
                    <td className="p-2 border text-ivtcolor2">{school.email}</td>
                    <td className="p-2 border text-ivtcolor2">
                      <button
                        onClick={() => handleSelectSchool(school.name, school.cnpj)}
                        className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full">
                        {t.t("Select")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate totalPage={totalPage} itemsPerPage={itemsPerPage} currentPage={currentPage} goToPage={goToPage} previousPage={previousPage} nextPage={nextPage} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />
        </div>

        <div className="flex justify-center items-top p-5">
          <form className="bg-white p-10 rounded-lg shadow-md ">
            <h1 className="text-center text-2xl font-bold mb-8 text-ivtcolor2">{t.t("Assign Tokens")}</h1>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2 font-bold text-lg text-ivtcolor2">
                {t.t("Selected School")}:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                readOnly
                className={selectField}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="state" className="mb-2 font-bold text-lg text-ivtcolor2">
                Tokens:
              </label>
              <input
                placeholder="100"
                type="text"
                id="state"
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
                required
                className={selectField}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={(event) => {
                  event.preventDefault()
                  handleSubmit(cnpj, tokens)
                }}
                className="text-white font-bold py-2 px-4 rounded-full gradient-animation"
              >
                <span className="flex items-center">
                  {t.t("Assign")}
                  <SendIcon />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default AssignTokensSchool

