import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import SchoolIcon from "~/styles/styledComponents/icons/SchoolIcon"
import TableIcon from "~/styles/styledComponents/icons/TableIcon"
import NoNavbarHeader from "~/styles/styledComponents/loggedOutZone/NoNavbarHeader"
import DashboardButtonLeft from "~/styles/styledComponents/shared/DashboardButtonLeft"
import DashboardButtonRight from "~/styles/styledComponents/shared/DashboardButtonRight"
import GigaTokenTitle from "~/styles/styledComponents/shared/GigaTokenTitle"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"

const Documentation: NextPage = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)

    return (
        <>
            <PageHeader title={t.t("Documentation")} />
            <NoNavbarHeader />
            <main className="flex justify-center items-center mt-12 min-h-screen">
                <div className="w-full max-w-3xl p-6 flex flex-col items-center space-y-4">
                    <GigaTokenTitle locale={locale} />
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <DashboardButtonLeft title={t.t("Open Ticket")} link={"dev/open-ticket"} RightIcon={SchoolIcon} />
                        <DashboardButtonRight title={t.t("Documentation")} link={"dev/docs"} RightIcon={TableIcon} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Documentation