import { api } from "~/utils/api"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import { useState } from "react"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import NoTicketsModal from "~/styles/styledComponents/modals/NoTickets"
import TicketClosedModal from "~/styles/styledComponents/modals/TicketClosedModal"
import { formatDate } from "~/utils/functions/ispFunctions"
import SwitchTickets from "~/styles/styledComponents/shared/SwitchTicketsButton"

const OpenedTickets: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [ticketClosedModalIsOpen, setTicketClosedModalIsOpen] = useState(false)
    const [noTicketsModalIsOpen, setNoTicketsModalIsOpen] = useState(false)

    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)

    const isAdmin = api.admin.isAdmin.useQuery()
    const { data, isLoading } = api.admin.getOpenedTickets.useQuery()
    const { mutate } = api.admin.closeTicket.useMutation()

    if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
    if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
    if (isLoading) return <LoadingComponent locale={locale} />
    if (!data) return <ErrorMessageComponent locale={locale} />

    const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleCloseTicket = (ticketId: string) => {
        if (ticketId === "-") {
            return setNoTicketsModalIsOpen(true)
        } else {
            mutate({ ticketId })
            setTicketClosedModalIsOpen(true)
        }
    }

    const closeModal = () => {
        setTicketClosedModalIsOpen(false)
        window.location.reload()
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
                                <th className="p-2 border text-ivtcolor2">{t.t("Subject")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Message")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Created At")}</th>
                                <th className="p-2 border text-ivtcolor2">{t.t("Close")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((ticket) => (
                                <tr key={ticket.id} className="bg-white text-center hover:bg-gray-200">
                                    <td className="p-2 border text-ivtcolor2">{ticket.name}</td>
                                    <td className="p-2 border text-ivtcolor2">{ticket.email}</td>
                                    <td className="p-2 border text-ivtcolor2">{ticket.subject}</td>
                                    <td className="p-2 border text-ivtcolor2">{ticket.message}</td>
                                    <td className="p-2 border text-ivtcolor2">{formatDate(String(ticket.createdAt))}</td>
                                    <td className="p-2 border text-ivtcolor2">
                                        <button
                                            onClick={() => handleCloseTicket(ticket.id)}
                                            className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            {t.t("Close")}
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
            {noTicketsModalIsOpen && (
                <NoTicketsModal closeModal={() => setNoTicketsModalIsOpen(false)} locale={locale} />
            )}
            {ticketClosedModalIsOpen && (
                <TicketClosedModal closeModal={closeModal} locale={locale} />
            )}
            <PageHeader title={t.t("Opened Tickets")} />
            <div className="p-8">
                <HomeButton />
                <div className="shadow overflow-hidden bg-white border-b border-gray-200 sm:rounded-lg mt-8">
                    <div className="flex justify-between rounded">
                        <h2 className="p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{t.t("Opened Tickets")}</h2>
                        <SwitchTickets path={"closed"} locale={locale} />
                    </div>
                    {renderTable()}
                </div>
            </div>
        </>
    )
}

export default OpenedTickets