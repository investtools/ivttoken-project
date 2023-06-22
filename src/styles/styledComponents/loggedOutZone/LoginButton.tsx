import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import LoginIcon from "../icons/LoginIcon"

const LoginButton: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    const handleClick = () => {
        void router.push('/register-login')
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="loginSvgEffect border border-white gradient-animation border-white shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ivtcolor text-white font-bold py-2 px-4 rounded-full">
                <span className="flex items-center font-bold">
                    {t.t("Enter")}&nbsp;&nbsp;
                    <div className="transform scale-x-[-1] ">
                        <LoginIcon />
                    </div>
                </span>
            </button>
        </>
    )
}

export default LoginButton