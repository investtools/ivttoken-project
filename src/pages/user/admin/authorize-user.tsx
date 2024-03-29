import { api } from "~/utils/api"
import type { NextPage } from "next"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import SendIcon from "~/styles/styledComponents/icons/SendIcon"
import FormSentModal from "~/styles/styledComponents/modals/FormSentModal"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { validateEmail } from "~/utils/functions/adminFunctions"
import InvalidEmailModal from "~/styles/styledComponents/modals/InvalidEmailModal"
import { selectField } from "~/styles/styledComponents/shared/selectFieldForms"
import React from "react"

const AuthorizeUser: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const t = new Translate(locale)

  const roles = [
    t.t("Role"),
    "Admin",
    "Internet Service Provider",
    "School Administrator"
  ]

  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState(roles[0])
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [FormSentModalIsOpen, setFormSentModalIsOpen] = useState(false)
  const [invalidEmailIsOpen, setInvalidEmailIsOpen] = useState(false)

  const isAdmin = api.admin.isAdmin.useQuery()
  const authorizeUser = api.admin.authorizeUser.useMutation()

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />

  const handleSubmit = (email: string, selectedRole: string) => {
    if (selectedRole && selectedRole !== t.t("Role") && email) {
      if (validateEmail(email)) {
        authorizeUser.mutate({ email: email, role: selectedRole })
        setFormSentModalIsOpen(true)
      } else {
        setInvalidEmailIsOpen(true)
      }
    } else {
      setIncompleteFieldsModalIsOpen(true)
    }
  }

  return (
    <>
      <PageHeader title={t.t("Authorize User")} />
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeIncompleteFieldModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      {FormSentModalIsOpen && (
        <FormSentModal closeModal={() => setFormSentModalIsOpen(false)} locale={locale} />
      )}
      {invalidEmailIsOpen && (
        <InvalidEmailModal closeModal={() => setInvalidEmailIsOpen(false)} locale={locale} />
      )}
      <div className="p-8">
        <HomeButton />
        <div className="flex justify-center items-top p-5">
          <form className="bg-white p-10 rounded-lg shadow-md">
            <h1 className="text-center text-2xl font-bold mb-8 text-ivtcolor2">{t.t("Credentials")}</h1>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2 font-bold text-lg text-ivtcolor2">
                E-mail:
              </label>
              <input
                placeholder="email@domain.com"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={selectField}
              />
            </div>
            <Listbox value={selected} onChange={(e) => setSelected(e)}>
              <div className="relative mt-1 mb-4">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-ivtcolor sm:text-sm">
                  <span className="text-gray-900 block truncate">
                    {selected === t.t("Role") ? t.t('Role') : t.t(String(selected))}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className=" text-gray-900 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {roles.map((userRole, userRoleIdx) => (
                      <Listbox.Option
                        key={userRoleIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-ivtcolor text-white' : 'text-gray-900'
                          }`
                        }
                        value={userRole}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {t.t(userRole)}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ivtcolor2">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div className="flex justify-center">
              <button
                onClick={(event) => {
                  event.preventDefault()
                  if (selected !== undefined) {
                    handleSubmit(email, selected)
                  }
                }}
                className="border border-transparent shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ivtcolor text-white font-bold py-2 px-4 rounded-full gradient-animation"
              >
                <span className="flex items-center">
                  {t.t("Authorize User")}
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

export default AuthorizeUser
