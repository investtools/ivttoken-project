import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Cards from "./Cards"

const About: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="text-center p-6 grid">
          <span className="text-ivtcolor2 text-3xl mb-6 font-bold">{t.t("About The Project")}</span>
          <span className="text-ivtcolor2hover">{t.t("Project Giga Token is a blockchain initiative aimed at global connectivity. It uses a digital currency to reward ISP's for connecting schools, promoting equal internet access and enhancing educational opportunities worldwide.")}</span>
        </div>

        <div className="grid grid-cols-4 rounded-b gap-8 p-8 mx-auto justify-between text-center bg-white items-stretch">
          <Cards title={"Diagnosis"} description={"Through the Connected School Index, we ensure schools are prepared and equipped to participate in the GigaToken program."} path={"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"} />
          <Cards title={"Connection"} description={"We forge connections between schools and local internet providers, thereby ensuring the expansion and sustainability of our project."} path={"M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"} />
          <Cards title={"Monitoring"} description={"We keep a real-time check on the connectivity in schools using our dedicated platform, ensuring secure and high-quality internet access for students."} path={"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"} />
          <Cards title={"Measurement"} description={"We measure the impact of our efforts through predetermined indicators. This process is vital to demonstrate how high-speed internet can significantly enhance student performance."} path={"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"} />
        </div>
      </div>
    </>
  )
}

export default About