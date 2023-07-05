import { useRouter } from "next/router"
import { Translate } from "translate/translate"

const History: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <div className="md:bg-gradient-to-r from-ivtcolor2 via-hover to-ivtcolor2 rounded-lg flex items-center justify-center md:border-2 bg-transparent">
        <div className="text-center p-6 grid gap-5 md:w-1/2 bg-white md:rounded-none rounded-lg">
          <span className="text-ivtcolor2 text-3xl font-bold">{t.t("Our History")}</span>
          <span className="text-ivtcolor2hover">{t.t("We emerged in 2007 with an ambitious goal.")}</span>
          <span className="text-ivtcolor2hover">{t.t("We are a company focused on the best technology solutions for the financial market, operating with excellence in service and with a high level of technological innovation.")}</span>
          <span className="text-ivtcolor2hover">{t.t("Born with a focus only on solutions for brokerage firms, Investtools has always grown in search of important and unprecedented solutions for the financial market. In 2009, Perform It is developed as an innovative software where the client could have full control of the investment flow of his asset management firm. In 2014, under the command of new partners, the company was re-founded. In 2017, new products and companies emerge, such as Grana Capital, Arcon It and Blockchain Studio. In the last four years, we have considerably increased the number of clients, expanded our team and continued to develop new technological tools. ")}</span>
          <span className="text-ivtcolor2hover">{t.t("This is just the beginning of a path with many innovations ahead, always developing the best solutions for the market.")}</span>
          <span className="text-ivtcolor2hover">{t.t("We are driven by the challenge of constant innovation and user satisfaction. We work to become a reference in the market, as a company of technological excellence and a reference in the financial area.")}</span>
        </div>
      </div>
    </>
  )
}

export default History