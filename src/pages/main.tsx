import type { NextPage } from "next"
import PageHeader from "../styles/styledComponents/shared/PageHeader"
import Header from "../styles/styledComponents/loggedOutZone/Header"
import MainTitle from "~/styles/styledComponents/loggedOutZone/MainTitle"
import About from "~/styles/styledComponents/loggedOutZone/about/About"
import History from "~/styles/styledComponents/loggedOutZone/History"
import Pillars from "~/styles/styledComponents/loggedOutZone/Pillars"
import Testimonials from "~/styles/styledComponents/loggedOutZone/testimonials/Testimonials"

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
          <History />
        </div>

        <div id='pillars' className="mb-8">
          <Pillars />
        </div>

        <div id='collaboration' className="mb-8">
          <About />
        </div>

        <div id='institutional' className="mb-8">
          <About />
        </div>

        <div id='testimonials'>
          <Testimonials />
        </div>
      </div>
    </>
  )
}

export default LoggedOutZone