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
      <div className="hover:scale-110 duration-500 grid card-shadow rounded p-6 flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[150px] h-[150px] text-hover mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
        <span className="text-ivtcolor2hover text-xl font-bold mt-2">{t.t(title)}</span>
        <span className="text-ivtcolor2hover">{t.t(description)}</span>
      </div>
    </>
  )
}

export default Cards