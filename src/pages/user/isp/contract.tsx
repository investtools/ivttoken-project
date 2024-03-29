import { api } from "~/utils/api"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import MiniContractsIcon from "~/styles/styledComponents/icons/MiniContractsIcon"
import ConfirmContractModal from "~/styles/styledComponents/modals/ConfirmContractModal"
import ContractSentModal from "~/styles/styledComponents/modals/ContractSentModal"
import Underline from "~/styles/styledComponents/shared/Underline"
import CardsHeader from "~/styles/styledComponents/shared/CardsHeader"
import { translateSchoolKey } from "~/utils/functions/ispFunctions"

const Contract: React.FC = () => {
  const [email, setCnpj] = useState('')
  const [confirmContractModalIsOpen, setConfirmContractModalIsOpen] = useState(false)
  const [contractSentModalIsOpen, setContractSentModalIsOpen] = useState(false)
  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  useEffect(() => {
    if (router.query.email) {
      setCnpj(router.query.email as string)
    }
  }, [router.query.email])

  const isIsp = api.internetServiceProviders.isIsp.useQuery()
  const getSchoolByCnpj = api.schools.getSchoolByEmail.useQuery({ email })
  const createContract = api.internetServiceProviders.createContract.useMutation()

  if (isIsp.isLoading) return <LoadingComponent locale={locale} />
  if (getSchoolByCnpj.isLoading) return <LoadingComponent locale={locale} />
  if (isIsp.data == false) return <ErrorMessageComponent locale={locale} />
  if (!getSchoolByCnpj.data) return <ErrorMessageComponent locale={locale} />

  const confirmContract = () => {
    createContract.mutate({ schoolEmail: email })
    setContractSentModalIsOpen(true)
  }

  const handleSubmit = () => {
    setConfirmContractModalIsOpen(true)
  }

  return (
    <>
      {contractSentModalIsOpen && (
        <ContractSentModal closeModal={() => setContractSentModalIsOpen(false)} locale={locale} />
      )}
      {confirmContractModalIsOpen && (
        <ConfirmContractModal closeModal={() => setConfirmContractModalIsOpen(false)} onConfirm={() => confirmContract()} locale={locale} />
      )}
      <PageHeader title={t.t("Contract")} />
      <div className="p-8">
        <HomeButton />
        <div className="mt-8">
          <div className="bg-white p-4 my-4 rounded shadow">
            <CardsHeader title={t.t("School Details")} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-900">
              {Object.keys(getSchoolByCnpj.data).map((key, index) => {
                const typedKey = key as keyof typeof getSchoolByCnpj.data
                return (
                  <div key={index} className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="text-ivtcolor2 font-semibold">{t.t(translateSchoolKey(key))}</h3>
                    <Underline />
                    <p>{t.t(String(getSchoolByCnpj.data[typedKey]))}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center">
              <button
                style={{ marginTop: "1rem" }}
                onClick={(event) => {
                  event.preventDefault()
                  handleSubmit()
                }}
                className="text-white font-bold py-2 px-4 rounded-full gradient-animation"
              >
                <span className="flex items-center">
                  {t.t("Send Contract")}
                  &nbsp;<MiniContractsIcon />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contract
