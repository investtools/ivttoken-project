import type { NextPage } from "next"
import PageHeader from "../styles/styledComponents/shared/PageHeader"
import Header from "../styles/styledComponents/loggedOutZone/Header"
import MainTitle from "~/styles/styledComponents/loggedOutZone/MainTitle"
import About from "~/styles/styledComponents/loggedOutZone/about/About"

const LoggedOutZone: NextPage = () => {
  return (
    <>
      <PageHeader title={"Giga Token"} />
      <Header />
      <MainTitle />

      <div className="p-8">
        <div id='about' className="mb-8">
          <About />
        </div>

        <div id='history' className="mb-8">
          <About />
        </div>

        <div id='join' className="mb-8">
          <About />
        </div>

        <div id='collaboration' className="mb-8">
          <About />
        </div>

        <div id='institutional' className="mb-8">
          <About />
        </div>

        <div id='testimonials'>
          <About />
        </div>
      </div>
    </>
  )
}

export default LoggedOutZone