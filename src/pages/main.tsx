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

        <div id='about' className="flex flex-col justify-start min-h-[1000px]">
          sobre
        </div>

        <div id='history' className="flex flex-col justify-start min-h-[1000px]">
          historia
        </div>

        <div id='join' className="flex flex-col justify-start min-h-[1000px]">
          join
        </div>

        <div id='collaboration' className="flex flex-col justify-start min-h-[1000px]">
          collab
        </div>

        <div id='institutional' className="flex flex-col justify-start min-h-[1000px]">
          div institucional
        </div>

        <div id='testimonials' className="flex flex-col justify-start min-h-[1000px]">
          div testimonials
        </div>

      </div>
    </>
  )
}

export default LoggedOutZone