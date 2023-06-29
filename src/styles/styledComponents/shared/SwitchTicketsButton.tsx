import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import SwitchIcon from "../icons/SwitchIcon"

type SwitchTicketsProps = {
    path: string
    locale: string
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const SwitchTickets: React.FC<SwitchTicketsProps> = ({ path, locale }) => {
    const router = useRouter()
    const t = new Translate(locale)

    return (
        <div className="flex items-center mr-3">
            <button className="bg-ivtcolor rounded-full text-white font-bold py-1 px-2 flex items-center justify-center space-x-1" onClick={() => void router.push(`/user/admin/tickets/${path}`)}>
                <div>
                    {t.t(`${capitalizeFirstLetter(path)} Tickets`)}
                </div>
                <SwitchIcon />
            </button>
        </div>
    )
}

export default SwitchTickets