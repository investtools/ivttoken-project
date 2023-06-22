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
      </div>
    </>
  )
}

export default LoggedOutZone