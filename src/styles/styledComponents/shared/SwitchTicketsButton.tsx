import { Translate } from "translate/translate"
import SwitchIcon from "../icons/SwitchIcon"

type SwitchTicketsProps = {
    locale: string
    setClosed: (closed: boolean) => void
    closed: boolean
}

const SwitchTickets: React.FC<SwitchTicketsProps> = ({ locale, setClosed, closed }) => {
    const t = new Translate(locale)

    return (
        <div className="flex items-center mr-3">
            <button className="bg-ivtcolor rounded-full text-white font-bold py-1 px-2 flex items-center justify-center whitespace-nowrap" onClick={() => setClosed(!closed)}>
                <div className="flex items-center">
                    {t.t(`${closed ? "Opened" : "Closed"} Tickets`)}&nbsp;
                    <SwitchIcon />
                </div>
            </button>
        </div>
    )
}

export default SwitchTickets