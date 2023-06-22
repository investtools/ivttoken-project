import type { NextPage } from "next"
import { useRouter } from "next/router"
import PageHeader from "../styles/styledComponents/shared/PageHeader"
import { Translate } from "translate/translate"
import Header from "../styles/styledComponents/loggedOutZone/Header"

const LoggedOutZone: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <PageHeader title={"Giga Token"} />
      <Header />
      <div className="p-8">
        <div className="mt-10">
           foto
        </div>

        <div id='about' className="">
          
        </div>

        <div id='history' className="">
          
        </div>

        <div id='join' className="">
          
        </div>

        <div id='collaboration' className="">
          
        </div>

        <div id='institutional' className="">
          
        </div>

        <div id='testimonials' className="">
          
        </div>
      </div>
    </>
  )
}

export default LoggedOutZone