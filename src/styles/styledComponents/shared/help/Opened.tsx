import { api } from "~/utils/api"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import { useState } from "react"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import { formatDate } from "~/utils/functions/ispFunctions"
import NoHelpsModal from "../../modals/NoHelpsModal"
import AnswerModal from "../../modals/AnswerModal"

const OpenedHelp: React.FC = () => {
    const [name, setName] = useState("")
    const [helpId, setHelpId] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([""])
    const [subject, setSubject] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
    const [noHelpsModalIsOpen, setNoHelpsModalIsOpen] = useState(false)

    const router = useRouter()
    const locale = router.locale === undefined ? 'pt-br' : router.locale
    const t = new Translate(locale)

    const isAdmin = api.admin.isAdmin.useQuery()
    const { data, isLoading } = api.admin.getOpenedHelps.useQuery()

    if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
    if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
    if (isLoading) return <LoadingComponent locale={locale} />
    if (!data) return <ErrorMessageComponent locale={locale} />

    const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleAnswer = (helpId: string, name: string, subject: string, message: string, email: string, messages: string[]) => {
        if (helpId === "-") return setNoHelpsModalIsOpen(true)
        setName(name)
        setSubject(subject)
        setMessage(message)
        setEmail(email)
        setHelpId(helpId)
        setAnswerModalIsOpen(true)
        setMessages(messages)
    }

    const renderTable = () => {
        return (
            <div className="bg-white rounded-b">
                <div className="overflow-x-auto">
                    <table className="w-9/10 mx-auto min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="text-center bg-gray-200">
                                <th className="p-2 border text-ivtcolor2">{t.t("Name")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("E-Mail")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("CNPJ")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Subject")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Message")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Created At")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Answer")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((help) => (
                                <tr key={help.id} className="bg-white text-center hover:bg-gray-200">
                                    <td className="p-2 border text-ivtcolor2">{help.name}</td>
                                    <td className="p-2 border text-ivtcolor2">{help.email}</td>
                                    <td className="p-2 border text-ivtcolor2">{help.cnpj}</td>
                                    <td className="p-2 border text-ivtcolor2">{help.subject}</td>
                                    <td className="p-2 border text-ivtcolor2">{help.message}</td>
                                    <td className="p-2 border text-ivtcolor2">{formatDate(String(help.createdAt))}</td>
                                    <td className="p-2 border text-ivtcolor2">
                                        <button onClick={() => handleAnswer(help.id, help.name, help.subject, help.message, help.email, help.messages)} className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full">
                                            {t.t("Answer")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Paginate totalPage={totalPage} itemsPerPage={itemsPerPage} currentPage={currentPage} goToPage={goToPage} previousPage={previousPage} nextPage={nextPage} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />
            </div>
        )
    }

    return (
        <>
            {noHelpsModalIsOpen && (
                <NoHelpsModal closeModal={() => setNoHelpsModalIsOpen(false)} locale={locale} />
            )}
            {answerModalIsOpen && (
                <AnswerModal
                    closeModal={() => setAnswerModalIsOpen(false)}
                    locale={locale}
                    ispName={name}
                    helpSubject={subject}
                    helpMessage={message}
                    ispEmail={email} helpId={helpId}
                    messages={messages}
                />
            )}

            <div className="shadow overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-8">
                {renderTable()}
            </div>
        </>
    )
}

export default OpenedHelp
