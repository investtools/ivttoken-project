import { useRouter } from "next/router"
import { Translate } from "translate/translate"

type CardsProps = {
  path: string
  title: string
  description: string
}

const Cards: React.FC<CardsProps> = ({ path, title, description }) => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <div className="hover:scale-110 duration-500 grid card-shadow grid-cols-1 rounded p-6 flex flex-col justify-between items-start">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${title === "Monitoring" ? "" : ""} w-[150px] h-[150px] text-hover mx-auto`}>
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
          </svg>
          <div className="grid">
            <span className="text-ivtcolor2hover text-xl font-bold mb-2">{t.t(title)}</span>
            <span className="text-ivtcolor2hover">{t.t(description)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cards