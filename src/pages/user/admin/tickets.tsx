import { api } from "~/utils/api"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { useState } from "react"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import SwitchTicketsButton from "~/styles/styledComponents/shared/SwitchTicketsButton"
import ClosedTickets from "~/styles/styledComponents/shared/tickets/Closed"
import OpenedTickets from "~/styles/styledComponents/shared/tickets/Opened"

const Tickets: React.FC = () => {
    const [closed, setClosed] = useState(false)
    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)

    const isAdmin = api.admin.isAdmin.useQuery()
    const { data, isLoading } = api.admin.getClosedTickets.useQuery()

    if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
    if (isAdmin.isLoading) return <LoadingComponent locale={locale} />
    if (isLoading) return <LoadingComponent locale={locale} />
    if (!data) return <ErrorMessageComponent locale={locale} />

    return (
        <>
            <PageHeader title={closed ? t.t("Closed Tickets") : t.t("Opened Tickets")} />
            <div className="p-8">
                <HomeButton />
                <div className="shadow overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-8">
                    <div className="flex justify-between rounded">
                        <h2 className="p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{closed ? t.t("Closed Tickets") : t.t("Opened Tickets")}</h2>
                        <SwitchTicketsButton locale={locale} closed={closed} setClosed={() => setClosed(!closed)} />
                    </div>
                    {closed ? (<ClosedTickets />) : (<OpenedTickets />)}
                </div>
            </div>
        </>
    )
}

export default Tickets
