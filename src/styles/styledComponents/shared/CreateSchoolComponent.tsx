import FormSentModal from "~/styles/styledComponents/modals/FormSentModal"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import SendIcon from "~/styles/styledComponents/icons/SendIcon"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { getSchoolsFromGiga, validateEmail, type ViaCEPAddress } from "~/utils/functions/adminFunctions"
import InvalidEmailModal from "~/styles/styledComponents/modals/InvalidEmailModal"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import XMark from '../icons/XMarkIcon'
import type { inferRouterInputs } from '@trpc/server'
import { type AppRouter } from '~/server/api/root'
import CaptchaModal from '../modals/CaptchaModal'
import Captcha from './Captcha'
import ListboxComponent from './Listbox'
import { type GigaSchool } from '../../../service/types'
import FormInputField from "./FormInputField"
import TitleComponent from "./TitleComponent"

type RouterInput = inferRouterInputs<AppRouter>
type PageMutate = RouterInput['admin']['createSchool']
type ModalMutate = RouterInput['schools']['schoolToBeApproved']

type PageMutateFunction = (input: PageMutate) => void
type ModalMutateFunction = (input: ModalMutate) => void

type CreateSchoolComponentProps = {
  isModal: boolean
  mutate: PageMutateFunction | ModalMutateFunction
  closeModal: () => void
}

const CreateSchoolComponent: React.FC<CreateSchoolComponentProps> = ({ isModal, mutate, closeModal }) => {
  const [selectedSchool, setSelectedSchool] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [schoolList, setSchoolList] = useState<GigaSchool[]>([])
  const [filteredSchoolList, setFilteredSchoolList] = useState<GigaSchool[]>([])
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [inepCode, setInepCode] = useState('')
  const [email, setEmail] = useState('')
  const [administrator, setAdministrator] = useState('')
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [captchaModalIsOpen, setCaptchaModalIsOpen] = useState(false)
  const [verified, setVerified] = useState(false)
  const [invalidEmailIsOpen, setInvalidEmailIsOpen] = useState(false)
  const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const handleSubmit = (name: string, state: string, city: string, zipCode: string, address: string, number: number, inepCode: string, email: string, administrator: string) => {
    if (!name || !state || !city || !zipCode || !address || !inepCode || !email || !administrator || !number) return setIncompleteFieldsModalIsOpen(true)
    if (validateEmail(email) === false) return setInvalidEmailIsOpen(true)

    const inputData = { name, state, city, zipCode, address: address + ", " + String(number), inepCode, email, administrator: String(administrator), lat, lon }
    if (isModal) {
      if (verified === false) {
        return setCaptchaModalIsOpen(true)
      }
      (mutate as ModalMutateFunction)(inputData as ModalMutate)
    } else {
      (mutate as PageMutateFunction)(inputData as PageMutate)
    }
    setSentFormModalIsOpen(true)
  }

  const fetchAddress = async (zipCode: string) => {
    if (zipCode.length === 9) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        const data = await response.json() as ViaCEPAddress

        if (!data.erro) {
          setAddress(data.logradouro)
          setCity(data.localidade)
          setState(data.uf)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleCloseModal = () => {
    setSentFormModalIsOpen(false)
    closeModal()
  }

  const handleSent = () => {
    setSentFormModalIsOpen(false)
    void router.push('/')
  }

  const handleCaptchaResponse = (response: string | null): void => {
    if (response) {
      setVerified(true)
    }
  }

  useEffect(() => {
    if (schoolList.length === 0) {
      void getSchoolsFromGiga(setSchoolList, setLoading)
    }
  }, [schoolList])

  useEffect(() => {
    if (searchInput) {
      setDropdownVisible(true)
    } else {
      setDropdownVisible(false)
    }
  }, [searchInput])

  useEffect(() => {
    if (selectedSchool) {
      setDropdownVisible(false)
    }
  }, [selectedSchool])

  useEffect(() => {
    if (schoolList.length > 0) {
      const newFilteredSchoolList = schoolList.filter(school =>
        school.name.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 100)
      setFilteredSchoolList(newFilteredSchoolList)
    }
  }, [schoolList, searchInput])

  useEffect(() => {
    if (selectedSchool) {
      const school = schoolList.find(school => school.school_id === selectedSchool)
      if (school) {
        setLat(String(school.lat))
        setLon(String(school.lon))
        setName(school.name)
        setZipCode(school.postal_code)
        setEmail(school.email)
        setAddress(school.address)
        setCity(school.admin_1_name)
        setInepCode(school.school_id)
      }
    }
  }, [selectedSchool, schoolList])


  useEffect(() => {
    if (zipCode && !zipCode.includes("_")) {
      void fetchAddress(zipCode)
    }
  }, [zipCode])


  return (
    <>
      <PageHeader title={t.t("Create School")} />
      {sentFormModalIsOpen && (
        <FormSentModal closeModal={isModal ? handleCloseModal : handleSent} locale={locale} />
      )}
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeIncompleteFieldModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      {invalidEmailIsOpen && (
        <InvalidEmailModal closeModal={() => setInvalidEmailIsOpen(false)} locale={locale} />
      )}
      {captchaModalIsOpen && (
        <CaptchaModal closeModal={() => setCaptchaModalIsOpen(false)} locale={locale} />
      )}
      <div className="flex justify-center items-top p-5">
        <form className="bg-white p-10 rounded-lg">
          {isModal &&
            (<div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="slide-in-blurred-top inline-flex justify-center rounded-full border border-transparent bg-ivtcolor font-bold text-white hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <XMark />
              </button>
            </div>)
          }
          <TitleComponent title={t.t(isModal ? "Send School To Analysis" : "Create New School")} />
          <div style={{ position: 'relative' }} className="w-full">
            <FormInputField
              label={t.t("Search for a school...")}
              placeholder="E.E. João e Maria"
              value={searchInput}
              onChange={setSearchInput}
              required={false}
              loading={loading}
            />

            {dropdownVisible && (
              <div className="dropdown-menu">
                {filteredSchoolList.map(school => (
                  <div key={school.school_id} className="dropdown-item" onClick={() => {
                    setSelectedSchool(school.school_id)
                    setSearchInput('')
                  }}>
                    {school.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
            <FormInputField
              label={t.t("School's Name")}
              placeholder="E.E. João e Maria"
              value={name}
              onChange={setName}
              required={!name}
            />

            <FormInputField
              label={t.t("Zip Code")}
              placeholder="00000-000"
              mask="cep"
              value={zipCode}
              onChange={setZipCode}
              required={!zipCode}
            />

            <FormInputField
              label={t.t("State")}
              placeholder="SP"
              value={state}
              onChange={setState}
              required={!state}
            />

            <FormInputField
              label={t.t("City")}
              placeholder="São Paulo"
              value={city}
              onChange={setCity}
              required={!city}
            />

            <FormInputField
              label={t.t("Address")}
              placeholder="Rua Machado de Assis"
              value={address}
              required={!address}
              onChange={setAddress}
            />

            <FormInputField
              inputType="number"
              label={t.t("Number")}
              placeholder="1965"
              value={number}
              required={!number}
              onChange={setNumber}
            />

            <FormInputField
              label={t.t("Inep Code")}
              placeholder="12345678"
              value={inepCode}
              required={!inepCode}
              onChange={setInepCode}
              mask="inepcode"
            />

            <FormInputField
              label={t.t("E-Mail")}
              placeholder="email@domain.com"
              value={email}
              required={!email}
              onChange={setEmail}
            />

            <ListboxComponent
              label={t.t("Administrator")}
              placeholder={t.t("Administrator")}
              options={[
                { value: t.t("State"), label: t.t("State") },
                { value: t.t("Municipality"), label: t.t("Municipality") }
              ]}
              value={administrator}
              onChange={(value) => setAdministrator(String(value))}
              required={!administrator}
            />

            <div className="flex items-center justify-center mt-4">
              <button
                onClick={(event) => {
                  event.preventDefault()
                  handleSubmit(
                    name,
                    state,
                    city,
                    zipCode,
                    address,
                    Number(number),
                    inepCode,
                    email,
                    administrator
                  )
                }}
                type="submit"
                className="whitespace-nowrap w-full border border-transparent shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ivtcolor text-white font-bold py-2 px-4 rounded-full gradient-animation">
                <span className="flex items-center justify-center">
                  {t.t("Create School")}
                  <SendIcon />
                </span>
              </button>
            </div>
          </div>

          {isModal && (
            <div className='flex justify-center md:mt-2 mt-10'>
              <Captcha onChange={handleCaptchaResponse} />
            </div>
          )}

          {isModal &&
            (<span className="text-gray-500 flex text-center mt-4">
              {t.t("Please note that the submitted school will be subject to review by an administrator before being approved. Thank you for your patience.")}
            </span>)
          }
        </form>
      </div >
    </>
  )
}

export default CreateSchoolComponent
