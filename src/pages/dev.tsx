import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import GitHubIcon from "~/styles/styledComponents/icons/GitHubIcon"
import IssuesIcon from "~/styles/styledComponents/icons/IssuesIcon"
import TicketIcon from "~/styles/styledComponents/icons/TicketIcon"
import NoNavbarHeader from "~/styles/styledComponents/loggedOutZone/NoNavbarHeader"
import DashboardButtonLeft from "~/styles/styledComponents/shared/DashboardButtonLeft"
import DashboardButtonRight from "~/styles/styledComponents/shared/DashboardButtonRight"
import GigaTokenTitle from "~/styles/styledComponents/shared/GigaTokenTitle"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"

const DevDashboard: NextPage = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? 'pt-br' : router.locale
    const t = new Translate(locale)

    return (
        <>
            <PageHeader title={t.t("Developer")} />
            <NoNavbarHeader dev={true} />
            <main className="flex justify-center items-center">
                <div className="w-full max-w-3xl p-6 flex flex-col items-center space-y-4 mt-14">
                    <GigaTokenTitle locale={locale} />
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <DashboardButtonLeft title={t.t("Open Ticket")} link={"dev/open-ticket"} RightIcon={TicketIcon} />
                        <DashboardButtonLeft title={t.t("GitHub Repository")} link={"https://github.com/investtools/ivttoken_frontend"} RightIcon={GitHubIcon} />
                        <DashboardButtonRight title={t.t("GitHub Issues")} link={"https://github.com/investtools/ivttoken_frontend/issues"} RightIcon={IssuesIcon} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default DevDashboard
