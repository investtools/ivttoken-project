import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import NoNavbarHeader from "~/styles/styledComponents/loggedOutZone/NoNavbarHeader"
import TicketFormComponent from "~/styles/styledComponents/loggedOutZone/dev/TicketFormComponent"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"

const Documentation: NextPage = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? 'pt-br' : router.locale
    const t = new Translate(locale)

    return (
        <>
            <PageHeader title={t.t("Open Ticket")} />
            <NoNavbarHeader dev={false} />
            <div className="min-h-screen flex items-center">
                <TicketFormComponent locale={locale} />
            </div>
        </>
    )
}

export default Documentation
