import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import CreateSchoolModal from "../modals/CreateSchoolModal"
import { useState } from "react"
import RegisterISPModal from "../modals/RegisterISPModal"

const MainTitle: React.FC = () => {
  const [createSchoolModalIsOpen, setCreateSchoolModalIsOpen] = useState(false)
  const [registerISPModalIsOpen, setRegisterISPModalIsOpen] = useState(false)

  const router = useRouter()
  const locale = router.locale === undefined ? "pt-br" : router.locale
  const t = new Translate(locale)

  const clickSchool = () => {
    setCreateSchoolModalIsOpen(true)
  }

  const clickISP = () => {
    setRegisterISPModalIsOpen(true)
  }

  return (
    <>
      {registerISPModalIsOpen && (
        <RegisterISPModal closeModal={() => setRegisterISPModalIsOpen(false)} />
      )}
      {createSchoolModalIsOpen && (
        <CreateSchoolModal closeModal={() => setCreateSchoolModalIsOpen(false)} />
      )}
      <div id='home'>
        <div className="h-screen bg-main flex md:w-full">
          <div className="md:w-1/2 text-start flex flex-col justify-center items-start font-bold text-white p-8 z-40 md:ml-12">
            <h2 className="md:text-7xl text-6xl mb-4 leading-[5rem]">{t.t("Connecting schools worldwide")}</h2>
            <div>
              {/* <button
                onClick={clickSchool}
                className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full mt-4 md:mr-6 mr-2">
                {t.t("Register School")}
              </button> */}
              <button
                onClick={clickISP}
                className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full">
                {t.t("Register ISP")}
              </button>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-4 font-bold p-4 text-center bg-white">
          <div className="grid">
            <span className="text-hover text-6xl">219</span>
            <span className="text-ivtcolor2hover mt-2 border-b-2 border-ivtcolor2">{t.t("Connected Schools")}</span>
          </div>

          <div className="grid">
            <span className="text-hover text-6xl">404</span>
            <span className="text-ivtcolor2hover mt-2 border-b-2 border-ivtcolor2">{t.t("Schools Using Connection")}</span>
          </div>

          <div className="grid">
            <span className="text-hover text-6xl">9</span>
            <span className="text-ivtcolor2hover mt-2 border-b-2 border-ivtcolor2">{t.t("Internet Service Providers")}</span>
          </div>

          <div className="grid">
            <span className="text-hover text-6xl">82368</span>
            <span className="text-ivtcolor2hover mt-2 border-b-2 border-ivtcolor2">{t.t("Benefited Students")}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainTitle
