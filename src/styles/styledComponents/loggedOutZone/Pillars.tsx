import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Cards from "./about/Cards"

const Pillars: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="text-center p-6 grid">
          <span className="text-ivtcolor2 text-3xl font-bold">{t.t("Our Pillars")}</span>
        </div>

        <div className="grid grid-cols-4 rounded-b gap-8 p-8 mx-auto justify-between text-center bg-white items-stretch">
          <Cards title={"Purpose"} description={"We drive societal transformation through connectivity."} path={"M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"} />
          <Cards title={"Mission"} description={"To connect people to quality internet to make world a place with more opportunities for all through education."} path={"M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"} />
          <Cards title={"Vision"} description={"A world where all people, regardless of gender, ethnicity or social class, have access to inclusive, connected, equitable, and quality education."} path={"M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />

          <div className="hover:scale-110 border-4 border-transparent hover:border-hover transition duration-500 grid card-shadow grid-cols-1 rounded p-6 flex-col justify-between items-start transform">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-[150px] h-[150px] text-hover mx-auto`}>
                <path strokeLinecap="round" strokeLinejoin="round" d={"M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"} />
              </svg>
              <div className="grid">
                <span className="text-ivtcolor2hover text-xl font-bold mb-2">{t.t("Values")}</span>
                <span className="text-ivtcolor2hover">• {t.t("Quality Focus")}</span>
                <span className="text-ivtcolor2hover">• {t.t("Promoting Equality")}</span>
                <span className="text-ivtcolor2hover">• {t.t("Problem Solving Belief")}</span>
                <span className="text-ivtcolor2hover">• {t.t("Innovation and Excellence")}</span>
                <span className="text-ivtcolor2hover">• {t.t("Empathetic and Altruistic Relations")}</span>
                <span className="text-ivtcolor2hover">• {t.t("Ethical Conduct and Transparency")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pillars

