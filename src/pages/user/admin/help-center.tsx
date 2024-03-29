import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { useState } from "react"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ClosedHelp from "~/styles/styledComponents/shared/help/Closed"
import OpenedHelp from "~/styles/styledComponents/shared/help/Opened"
import SwitchISPHelpButton from "~/styles/styledComponents/shared/SwitchISPHelpButton"

const HelpCenter: React.FC = () => {
    const [closed, setClosed] = useState(false)
    const router = useRouter()
    const locale = router.locale === undefined ? 'pt-br' : router.locale
    const t = new Translate(locale)

    return (
        <>
            <PageHeader title={closed ? t.t("Closed Help") : t.t("Opened Help")} />
            <div className="p-8">
                <HomeButton />
                <div className="shadow overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-8">
                    <div className="flex justify-between rounded">
                        <h2 className="p-2 rounded-t text-ivtcolor2 font-bold text-2xl">{closed ? t.t("Closed Help") : t.t("Opened Help")}</h2>
                        <SwitchISPHelpButton locale={locale} closed={closed} setClosed={() => setClosed(!closed)} />
                    </div>
                    {closed ? (<ClosedHelp />) : (<OpenedHelp />)}
                </div>
            </div>
        </>
    )
}

export default HelpCenter
