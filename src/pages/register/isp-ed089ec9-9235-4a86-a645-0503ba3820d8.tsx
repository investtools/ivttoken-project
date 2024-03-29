import { api } from "~/utils/api"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import FormSentModal from "~/styles/styledComponents/modals/FormSentModal"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import { useState } from 'react'
import SendIcon from "~/styles/styledComponents/icons/SendIcon"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { Role } from "@prisma/client"
import InputMask from 'react-input-mask'
import { selectField } from "~/styles/styledComponents/shared/selectFieldForms"

const RegisterISP: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)

  const userHasAccount = api.generalLogin.getUserRole.useQuery()
  const userAuthorizedRole = api.generalLogin.getAuthorizedRole.useQuery()
  const { mutate, isLoading } = api.internetServiceProviders.registerISP.useMutation()

  if (userAuthorizedRole.data !== Role.ISP) return <ErrorMessageComponent locale={locale} />
  if (isLoading) return <LoadingComponent locale={locale} />

  const handleSubmit = (name: string, cnpj: string) => {
    if (name && cnpj) {
      try {
        setSentFormModalIsOpen(true)
        mutate({ name, cnpj })
      } catch (error) {
        console.log(error)
        return null
      }
    } else {
      setIncompleteFieldsModalIsOpen(true)
    }
  }

  return (
    <>
      <PageHeader title={t.t("Register Provider")} />
      {sentFormModalIsOpen && (
        <FormSentModal closeModal={() => setSentFormModalIsOpen(false)} locale={locale} />
      )}
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeIncompleteFieldModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      {userHasAccount.data ? (
        <ErrorMessageComponent locale={locale} />
      ) : (
        <div className="p-8">
          <HomeButton />
          <div>
            <div className="flex justify-center items-top p-5">
              <form className="bg-white p-10 rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-bold mb-8 text-ivtcolor2">{t.t("Register Your Credentials")}</h1>
                <div className="flex flex-col mb-4">
                  <label htmlFor="name" className="mb-2 font-bold text-lg text-ivtcolor2">
                    {t.t("Company Name")}:
                  </label>
                  <input
                    placeholder="John Doe"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={selectField}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="cnpj" className="mb-2 font-bold text-lg text-ivtcolor2">
                    {t.t("Cnpj")}:
                  </label>
                  <InputMask
                    mask="99.999.999/9999-99"
                    placeholder="12.345.678/0001-00"
                    type="text"
                    id="cnpj"
                    value={cnpj}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value)}
                    required
                    className={selectField}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      handleSubmit(name, cnpj)
                    }}
                    className="text-white font-bold py-2 px-4 rounded-full gradient-animation"
                  >
                    <span className="flex items-center">
                      {t.t("Register Internet Provider")}
                      <SendIcon />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RegisterISP
