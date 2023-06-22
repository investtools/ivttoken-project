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
           foto a
        </div>

        <div id='about' className="py-[500px]">
           sobre
        </div>

        <div id='history' className="py-[500px]">
           historia
        </div>

        <div id='join' className="py-[500px]">
           join
        </div>

        <div id='collaboration' className="py-[500px]">
           collab
        </div>

        <div id='institutional' className="py-[500px]">
          div institucional
        </div>

        <div id='testimonials' className="py-[500px]">
          div testimonials
        </div>
      </div>
    </>
  )
}

export default LoggedOutZone