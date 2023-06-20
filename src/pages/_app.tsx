import { type AppType } from "next/app"
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { api } from "~/utils/api"
import "~/styles/globals.css"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import BackgroundWrapper from "~/styles/styledComponents/shared/BackgroundWrapper"
import Footer from "~/styles/styledComponents/shared/Footer"
import IspWalletComponent from "~/styles/styledComponents/shared/IspWalletComponent"
import SwitchLanguage from "~/styles/styledComponents/shared/SwitchLanguage"
import BrazilIcon from "~/styles/styledComponents/icons/BrazilIcon"
import USAIcon from "~/styles/styledComponents/icons/UsaIcon"

const App: AppType = ({ Component, pageProps }) => {
  const isIsp = (api.internetServiceProviders.isIsp.useQuery()).data
  return (
    <>
      <PageHeader title={"Sign-in or Log-in"} />
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: '#285966'
          }
        }}
      >
        <BackgroundWrapper>
          <SignedIn>
            <div className="z-30 fixed w-full py-2 bg-gradient-to-r border-b from-ivtcolor2 via-hover to-ivtcolor2">
              <div className="w-10/12 mx-auto flex justify-between items-center">
                <div className="flex items-center">
                  <UserButton />
                  <div style={{ marginLeft: '0.5rem' }}>
                    {isIsp && <IspWalletComponent />}
                  </div>
                </div>
                <div className="flex items-center">
                  <USAIcon />
                  <SwitchLanguage />
                  <BrazilIcon />
                </div>
              </div>
            </div>
            <Component {...pageProps} />
          </SignedIn>

          <SignedOut>
            <div className="flex justify-center p-48">
              <SignIn />
            </div>
          </SignedOut>
        </BackgroundWrapper>
      </ClerkProvider>
      <Footer />
    </>
  )
}

export default api.withTRPC(App)
