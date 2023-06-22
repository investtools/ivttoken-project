import React from 'react'
import Link from 'next/link'
import { Translate } from 'translate/translate'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div className="flex justify-around gap-6 bg-white rounded-full p-2 px-4 text-ivtcolor2 font-bold">
            <Link href="#about"><span className={`${window.location.hash === "#about" ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}>{t.t("About")}</span></Link>
            <Link href="#history"><span className={`${window.location.hash === "#history" ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}>{t.t("History")}</span></Link>
            <Link href="#join"><span className={`${window.location.hash === "#join" ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}>{t.t("Join")}</span></Link>
            <Link href="#collaboration"><span className={`${window.location.hash === "#collaboration" ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}>{t.t("Collaboration")}</span></Link>
            <Link href="#institutional"><span className={`${window.location.hash === "#institutional" ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}>{t.t("Institutional")}</span></Link>
            <Link href="#testimonials"><span className={`${window.location.hash === "#testimonials" ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}>{t.t("Testimonials")}</span></Link>
        </div>
    )
}

export default Navbar
