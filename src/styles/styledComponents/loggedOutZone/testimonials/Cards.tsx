import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Image from 'next/image'
import LinkedinIcon from "../../icons/LinkedinIcon"

type CardsProps = {
  path: string
  name: string
  description: string
}

const Cards: React.FC<CardsProps> = ({ path, name, description }) => {
  const router = useRouter()
  const locale = router.locale === undefined ? "pt-br" : router.locale
  const t = new Translate(locale)

  function getLinkedinUrl() {
    switch (name) {
      case "": return ""
      default: return "https://www.linkedin.com/in/murillolamberti/"
    }
  }
  const linkedinUrl = getLinkedinUrl()

  return (
    <>
      <div className="mb-4 hover:scale-110 border-4 border-transparent hover:border-hover transition duration-500 grid card-shadow grid-cols-1 rounded p-6 flex-col justify-between items-start transform">
        <div>
          <div className="border-4 border-ivtcolor2">
            <Image src={path} alt="testimonials pic" width={800} height={50} />
          </div>
          <div className="grid mt-4 mb-2">
            <span className="text-ivtcolor2hover text-xl font-bold mb-4">{t.t(name)}</span>
            <span className="text-ivtcolor2hover">{t.t(description)}</span>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            <button className="focus:outline-none">
              <LinkedinIcon />
            </button>
          </a>
        </div>
      </div>

    </>
  )
}

export default Cards
