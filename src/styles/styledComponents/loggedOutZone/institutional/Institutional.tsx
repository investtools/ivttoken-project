import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Cards from "./Cards"

const Institutional: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "pt-br" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="text-center p-6 grid">
          <span className="text-ivtcolor2 text-3xl font-bold">{t.t("Our Team")}</span>
        </div>

        <div className="grid md:grid-cols-3 rounded-b gap-8 p-8 mx-auto  justify-between items-start text-center bg-white">
          <Cards name={"David Gibbin"} path={"/david.png"} description={"CEO"} />
          <Cards name={"Marco Jardim"} path={"/marco.png"} description={"Blockchain Head"} />
          <Cards name={"Murillo Lamberti"} path={"/murillo.png"} description={"Software Engineer"} />
          <Cards name={"Marcus Rosier"} path={"/marcus.png"} description={"Project Manager"} />
          <Cards name={"Djulia Correa"} path={"/djulia.png"} description={"Designer"} />
          <Cards name={"Vicente Lavigne"} path={"/vicente.png"} description={"Commercial Director"} />
        </div>
      </div>
    </>
  )
}

export default Institutional
