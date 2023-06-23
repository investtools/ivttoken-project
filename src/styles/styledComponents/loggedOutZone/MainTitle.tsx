import { useRouter } from "next/router"
import { Translate } from "translate/translate"

const MainTitle: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  const clickSchool = () => {
    alert('clicou escola')
  }

  const clickISP = () => {
    alert('clicou isp')
  }

  return (
    <>
      <div className="h-screen bg-main flex p-12">
        <div className="w-6/12 text-start flex flex-col justify-center items-start font-bold text-white p-8 z-50">
          <h2 className="text-7xl mb-4 leading-[5rem]">{t.t("Connecting schools worldwide")}</h2>
          <div>
            <button
              onClick={clickSchool}
              className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full mt-4 mr-6">
              {t.t("Register School")}
            </button>
            <button
              onClick={clickISP}
              className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full">
              {t.t("Register ISP")}
            </button>
          </div>
        </div>
        <div className="w-1/2">
        </div>
      </div>
    </>
  )
}

export default MainTitle