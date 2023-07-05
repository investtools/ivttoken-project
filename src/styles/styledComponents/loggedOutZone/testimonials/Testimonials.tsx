import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import Cards from "./Cards"

const Testimonials: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="text-center p-6 grid">
          <span className="text-ivtcolor2 text-3xl font-bold">{t.t("Testimonials")}</span>
        </div>

        <div className="grid md:grid-cols-3 rounded-b gap-8 p-8 mx-auto  justify-between text-center bg-white items-stretch">
          <Cards name={"One"} path={"/it.png"} description={"This team's project is truly revolutionary. The focus on connecting underprivileged schools to the internet is not only a practical necessity but a powerful means of driving social change. The promise of equal access to education and resources is something we should all be working towards."} />
          <Cards name={"Two"} path={"/it.png"} description={"Access to quality education should not be a privilege but a fundamental right. This project is making tremendous strides in ensuring that every child, no matter their circumstances, can access the wealth of knowledge available online. Their work is a shining beacon of hope for the future."} />
          <Cards name={"Three"} path={"/it.png"} description={"The intersection of technology and social good is where true innovation lies. This project is a testament to that belief, helping bridge the digital divide in the most vital area - education. It's heartening to see such initiatives creating a meaningful impact in our communities."} />
        </div>
      </div>
    </>
  )
}

export default Testimonials