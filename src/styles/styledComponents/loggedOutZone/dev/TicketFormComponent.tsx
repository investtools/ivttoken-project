import React, { useState } from 'react'
import { Translate } from 'translate/translate'
import SendIcon from '../../icons/SendIcon'
import { validateEmail } from '~/utils/functions/adminFunctions'
import FormSentModal from '../../modals/FormSentModal'
import IncompleteFieldsModal from '../../modals/IncompleteFieldsModal'
import InvalidEmailModal from '../../modals/InvalidEmailModal'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'

type TicketFormComponentProps = {
    locale: string
}

const TicketFormComponent: React.FC<TicketFormComponentProps> = ({ locale }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
    const [invalidEmailIsOpen, setInvalidEmailIsOpen] = useState(false)
    const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)

    const { mutate } = api.admin.sendTicket.useMutation()

    const router = useRouter()
    const t = new Translate(locale)

    const handleSubmit = (name: string, email: string, subject: string, message: string) => {
        if (name && email && subject && message) {
            if (validateEmail(email)) {
                mutate({ name, email, subject, message })
                setSentFormModalIsOpen(true)
            } else {
                setInvalidEmailIsOpen(true)
            }
        } else {
            setIncompleteFieldsModalIsOpen(true)
        }
    }

    const handleCloseModal = () => {
        setSentFormModalIsOpen(false)
        void router.push('/dev')
    }

    return (
        <>
            {sentFormModalIsOpen && (
                <FormSentModal closeModal={handleCloseModal} locale={locale} />
            )}
            {incompleteFieldsModalIsOpen && (
                <IncompleteFieldsModal closeModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
            )}
            {invalidEmailIsOpen && (
                <InvalidEmailModal closeModal={() => setInvalidEmailIsOpen(false)} locale={locale} />
            )}
            <form className="hover:scale-110 duration-500 bg-white w-full max-w-lg mx-auto mt-5 px-4 py-3 border-2 border-transparent rounded shadow hover:shadow-2xl hover:border-ivtcolor2">
                <div>
                    <span className='text-2xl justify-center flex text-ivtcolor2 p-2 font-extrabold'>
                        {t.t("Open Ticket")}
                    </span>
                </div>
                <div className="mb-4">
                    <label className="block text-ivtcolor2 font-bold mb-2" htmlFor="name">
                        {t.t("Name")}
                    </label>
                    <input
                        className="shadow appearance-none border  w-full py-2 px-3 text-ivtcolor2 leading-tight  focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 border-ivtcolor p-2 rounded-lg focus-visible:ring-offset-ivtcolor"
                        id="name"
                        type="text"
                        placeholder={t.t("Your Name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-ivtcolor2 font-bold mb-2" htmlFor="email">
                        E-Mail
                    </label>
                    <input
                        className="shadow appearance-none border w-full py-2 px-3 text-ivtcolor2 leading-tight  focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 border-ivtcolor p-2 rounded-lg focus-visible:ring-offset-ivtcolor"
                        id="email"
                        type="email"
                        placeholder={t.t("Your E-Mail")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-ivtcolor2 font-bold mb-2" htmlFor="subject">
                        {t.t("Subject")}
                    </label>
                    <input
                        className="shadow appearance-none border w-full py-2 px-3 text-ivtcolor2 leading-tight  focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 border-ivtcolor p-2 rounded-lg focus-visible:ring-offset-ivtcolor"
                        id="subject"
                        type="text"
                        placeholder={t.t("Subject")}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-ivtcolor2 font-bold mb-2" htmlFor="message">
                        {t.t("Message")}
                    </label>
                    <textarea
                        className="shadow appearance-none border w-full py-2 px-3 text-ivtcolor2 leading-tight  focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 border-ivtcolor p-2 rounded-lg focus-visible:ring-offset-ivtcolor"
                        id="message"
                        placeholder={t.t("Message")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            handleSubmit(name, email, subject, message)
                        }}
                        className="gradient-animation text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit">
                        <span className="flex items-center">
                            {t.t("Send")}
                            <SendIcon />
                        </span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default TicketFormComponent
