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
      case "Bill Gates": return "https://www.linkedin.com/in/williamhgates/"
      case "Michelle Obama": return "https://www.google.com/search?q=michelle+obama&oq=michelle+obama&aqs=chrome.0.69i59l2j69i60l3.1681j0j4&sourceid=chrome&ie=UTF-8"
      case "Satya Nadella": return "https://www.linkedin.com/in/satyanadella/"
    }
  }
  const linkedinUrl = getLinkedinUrl()

  return (
    <>
      <div className="hover:scale-110 border-4 border-transparent hover:border-hover transition duration-500 grid card-shadow grid-cols-1 rounded p-6 flex flex-col justify-between items-start transform">
        <div>
          <div className="border-4 border-ivtcolor2">
            <Image src={path} alt="testimonials pic" width={300} height={50} />
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