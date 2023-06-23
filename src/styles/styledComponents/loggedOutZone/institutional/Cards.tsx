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
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  function getLinkedinUrl() {
    switch (name) {
      case "David Gibbin": return "https://www.linkedin.com/in/davidgibbin/"
      case "Murillo Lamberti": return "https://www.linkedin.com/in/murillolamberti/"
      case "Marco Jardim": return "https://www.linkedin.com/in/mjardim/"
      case "Marcus Rosier": return "https://www.linkedin.com/in/marcus-rosier/"
      case "Djulia Correa": return "https://www.linkedin.com/in/djulia-correa-765851204/"
      case "Vicente Lavigne": return "https://www.linkedin.com/in/vicente-lavigne-31340133/"
    }
  }
  const linkedinUrl = getLinkedinUrl()

  return (
    <>
      <div className="hover:scale-110 border-4 border-transparent hover:border-hover transition duration-500 grid card-shadow grid-cols-1 rounded p-6 flex flex-col justify-between items-start transform">
        <div>
          <div className="border-4 border-ivtcolor2">
            <Image src={path} alt="team members pic" width={300} height={50} />
          </div>
          <div className="grid mt-2 mb-2">
            <span className="text-ivtcolor2hover text-xl font-bold">{t.t(name)}</span>
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