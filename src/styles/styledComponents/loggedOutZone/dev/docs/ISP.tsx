import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import RouterDocumentation from "./RouterDoc"

const ProvidersRouter: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <div id="providers" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-2xl">
      <h1 className="text-4xl font-bold mb-6 text-ivtcolor2">{t.t("Internet Service Providers Router")}</h1>
      <div className='grid grid-cols-3 gap-8'>
        <RouterDocumentation title={'getIspToBeApproved'} description={'Retrieves all ISPs waiting for approval'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of ISP to be approved or default array'} />
        <RouterDocumentation title={'ispToBeApproved'} description={'Creates a request for ISP approval'} requestType={'Mutation'} procedure={'Public'} input={'name, cnpj, email'} output={'void'} />
        <RouterDocumentation title={'isIsp'} description={'Checks if the user is an ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'boolean'} />
        <RouterDocumentation title={'getIspData'} description={'Gets data for the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'ISP data object'} />
        <RouterDocumentation title={'getIspTransactions'} description={'Gets all token transactions for the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of ISP token transactions or default array'} />
        <RouterDocumentation title={'getIspContracts'} description={'Gets all contracts for the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of ISP contracts or default array'} />
        <RouterDocumentation title={'registerISP'} description={'Registers a user as an ISP'} requestType={'Mutation'} procedure={'Protected'} input={'name, cnpj'} output={'Registered ISP object'} />
        <RouterDocumentation title={'buyBenefits'} description={'Performs a benefits purchase for the ISP'} requestType={'Mutation'} procedure={'Protected'} input={'selectedBenefit'} output={'boolean or void'} />
        <RouterDocumentation title={'ispUnlockedTokens'} description={'Gets the amount of unlocked tokens for the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Unlocked tokens'} />
        <RouterDocumentation title={'createContract'} description={'Creates a contract for the ISP'} requestType={'Mutation'} procedure={'Protected'} input={'schoolCnpj'} output={'Contract object'} />
        <RouterDocumentation title={'getIspSchools'} description={'Gets all schools associated with the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of schools or default array'} />
      </div>
    </div>
  )
}

export default ProvidersRouter
