import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Translate } from "translate/translate"
import { api } from '~/utils/api'
import { validateEmail } from '~/utils/functions/adminFunctions'
import SendIcon from '../icons/SendIcon'
import PageHeader from '../shared/PageHeader'
import { selectField } from '../shared/selectFieldForms'
import FormSentModal from './FormSentModal'
import IncompleteFieldsModal from './IncompleteFieldsModal'
import InvalidEmailModal from './InvalidEmailModal'
import InputMask from 'react-input-mask'
import XMark from '../icons/XMarkIcon'

interface RegisterISPModalProps {
    closeModal: () => void
}

function RegisterISPModal({ closeModal }: RegisterISPModalProps) {
    const [isOpen] = useState(true)
    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [email, setEmail] = useState('')
    const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
    const [invalidEmailIsOpen, setInvalidEmailIsOpen] = useState(false)
    const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)

    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)

    const { mutate } = api.internetServiceProviders.ispToBeApproved.useMutation()

    const handleSubmit = (name: string, cnpj: string, email: string) => {
        if (name && cnpj && email) {
            if (validateEmail(email)) {
                mutate({ name, cnpj, email })
                setSentFormModalIsOpen(true)
            } else {
                setInvalidEmailIsOpen(true)
            }
        } else {
            setIncompleteFieldsModalIsOpen(true)
        }
    }

    const handleCloseSentFormModal = () => {
        setSentFormModalIsOpen(false)
        closeModal()
    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto z-40" onClose={closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&nbsp;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div className="inline-block align-bottom bg-transparent px-4 pt-5 pb-4 text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <>
                                {sentFormModalIsOpen && (
                                    <FormSentModal closeModal={handleCloseSentFormModal} locale={locale} />
                                )}
                                {incompleteFieldsModalIsOpen && (
                                    <IncompleteFieldsModal closeModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
                                )}
                                {invalidEmailIsOpen && (
                                    <InvalidEmailModal closeModal={() => setInvalidEmailIsOpen(false)} locale={locale} />
                                )}
                                <PageHeader title={t.t("Register ISP")} />
                                <div>
                                    <div className="flex justify-center items-top p-5">
                                        <form className="bg-white p-10 rounded-lg shadow-md">
                                            <div className="flex justify-end mb-4">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="slide-in-blurred-top inline-flex justify-center rounded-full border border-transparent bg-ivtcolor font-bold text-white hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                    <XMark />
                                                </button>
                                            </div>
                                            <h1 className="text-center text-2xl font-bold mb-8 text-ivtcolor2">{t.t("Send Provider To Analysis")}</h1>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="name" className="mb-2 font-bold text-lg text-ivtcolor2">
                                                    {t.t("Company Name")}:
                                                </label>
                                                <input
                                                    placeholder={t.t("Company Name")}
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

                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="email" className="mb-2 font-bold text-lg text-ivtcolor2">
                                                    {t.t("E-Mail")}:
                                                </label>
                                                <InputMask
                                                    mask=""
                                                    placeholder="email@domain.com"
                                                    type="text"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                                    required
                                                    className={selectField}
                                                />
                                            </div>

                                            <div className="flex justify-center">
                                                <button
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        handleSubmit(name, cnpj, email)
                                                    }}
                                                    className="text-white font-bold py-2 px-4 rounded-full gradient-animation"
                                                >
                                                    <span className="flex items-center">
                                                        {t.t("Send Provider")}
                                                        <SendIcon />
                                                    </span>
                                                </button>
                                            </div>
                                            <span className="text-gray-500 flex text-center mt-4">
                                                {t.t("Please note that the submitted provider will be subject to review by an administrator before being approved. Thank you for your patience.")}
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            </>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default RegisterISPModal
