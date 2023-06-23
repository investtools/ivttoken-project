import type { NextPage } from "next"
import PageHeader from "../styles/styledComponents/shared/PageHeader"
import Header from "../styles/styledComponents/loggedOutZone/Header"
import MainTitle from "~/styles/styledComponents/loggedOutZone/MainTitle"

const LoggedOutZone: NextPage = () => {

  return (
    <>
      <PageHeader title={"Giga Token"} />
      <Header />
      <div id='home'>
        <MainTitle />
      </div>

      <div className="p-8">
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