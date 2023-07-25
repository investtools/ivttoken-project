import { type AppType } from "next/app"
import { api } from "~/utils/api"
import "~/styles/globals.css"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import Footer from "~/styles/styledComponents/shared/Footer"
import IspWalletComponent from "~/styles/styledComponents/shared/IspWalletComponent"
import SwitchLanguage from "~/styles/styledComponents/shared/SwitchLanguage"
import BrazilIcon from "~/styles/styledComponents/icons/BrazilIcon"
import USAIcon from "~/styles/styledComponents/icons/UsaIcon"
import { useRouter } from "next/router"
import { isPublicPath } from "~/utils/functions/sharedFunctions"
import { Translate } from "translate/translate"
import HelpComponent from "~/styles/styledComponents/shared/HelpComponent"
import Providers from "~/styles/styledComponents/auth/Providers"
import UserButton from "~/styles/styledComponents/auth/UserButton"

const App: AppType = ({ Component, pageProps }) => {
  const isIsp = (api.internetServiceProviders.isIsp.useQuery()).data
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  const isPathPublic = isPublicPath(router.pathname)
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title={t.t("Register or Login")} />

      <div className="flex-grow">
        {isPathPublic ? (<Component {...pageProps} />) :
          (
            <Providers>
              <div className="z-30 fixed w-full py-2 bg-gradient-to-r border-b from-ivtcolor2 via-hover to-ivtcolor2">
                <div className="w-10/12 mx-auto flex justify-between items-center">
                  <div className="flex items-center">
                    <UserButton locale={locale} />
                    <div style={{ marginLeft: '0.5rem' }}>
                      {isIsp && <IspWalletComponent />}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <USAIcon />
                    <SwitchLanguage />
                    <BrazilIcon />
                  </div>
                  {isIsp && <HelpComponent locale={locale} />}
                </div>
              </div>
              <Component {...pageProps} />
            </Providers>
          )}
      </div>
      <Footer />
    </div>
  )
}

export default api.withTRPC(App)

