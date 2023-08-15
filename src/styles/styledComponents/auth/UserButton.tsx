import { signOut, useSession } from "next-auth/react"
import Image from 'next/image'
import { useState } from "react"
import { Translate } from "translate/translate"

const UserButton = ({ locale }: { locale: string }) => {
    const [showInfo, setShowInfo] = useState(false)
    const { data: session } = useSession()
    const t = new Translate(locale)

    if (session && session.user) {
        return (
            <div className="flex">
                <span className="flex items-center -translate-x-2 text-[14px] text-gray-400 py-0 px-4 bg-white rounded-lg">
                    <span className="border-b border-transparent">{t.t("Hello")},&nbsp;</span>
                    <span className="font-bold border-b border-ivtcolor2">{session.user.name}</span>!
                </span>
                <div className="rounded-full cursor-pointer" onClick={() => setShowInfo(!showInfo)}>
                    <div>
                        <Image width={35} height={1} src={session.user.image ?? ""} alt={'user image'} className="rounded-full" />
                    </div>
                    {showInfo &&
                        <div className="absolute translate-y-3 -translate-x-3 text-center">
                            <button onClick={() => void signOut({ callbackUrl: '/main' })} className="border gradient-animation text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                                {t.t("Sign Out")}
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default UserButton
