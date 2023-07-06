import { api } from "~/utils/api"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Paginate from "~/styles/styledComponents/shared/Paginate/Paginate"
import { useState } from "react"
import { paginateData } from "~/styles/styledComponents/shared/Paginate/paginateData"
import { formatDate } from "~/utils/functions/ispFunctions"

const ClosedTickets: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)

    const isAdmin = api.admin.isAdmin.useQuery()
    const { data, isLoading } = api.admin.getClosedTickets.useQuery()

    if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
    if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
    if (isLoading) return <LoadingComponent locale={locale} />
    if (!data) return <ErrorMessageComponent locale={locale} />

    const { goToPage, nextPage, previousPage, totalPage } = paginateData(data, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage)
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

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
                                <th className="p-2 border text-ivtcolor2">{t.t("Closed At")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((ticket) => (
                                <tr key={ticket.id} className="bg-white text-center hover:bg-gray-200">
                                    <td className="p-2 border text-ivtcolor2">{ticket.name}</td>
                                    <td className="p-2 border text-ivtcolor2">{ticket.email}</td>
                                    <td className="p-2 border text-ivtcolor2">{ticket.subject}</td>
                                    <td className="p-2 border text-ivtcolor2">{ticket.message}</td>
                                    <td className="p-2 border text-ivtcolor2">{formatDate(String(ticket.updatedAt))}</td>
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
            <div className="shadow overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-8">
                {renderTable()}
            </div>
        </>
    )
}

export default ClosedTickets
