import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import RouterDocumentation from "./RouterDoc"

const ProvidersRouter: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  return (
    <div id="providers" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-2xl">
      <h1 className="md:text-4xl text-3xl font-bold mb-6 text-ivtcolor2">{t.t("Internet Service Providers Router")}</h1>
      <div className='grid md:grid-cols-3 gap-8'>
        <RouterDocumentation title={'getIspToBeApproved'} description={'retrieves all ISPs waiting for approval'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of ISP to be approved'} />
        <RouterDocumentation title={'ispToBeApproved'} description={'creates a request for ISP approval'} requestType={'Mutation'} procedure={'Public'} input={'Name, CNPJ, Email'} output={''} />
        <RouterDocumentation title={'isIsp'} description={'checks if the user is an ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Boolean'} />
        <RouterDocumentation title={'getIspData'} description={"gets ISP's balance"} requestType={'Query'} procedure={'Protected'} input={''} output={'ISP balance'} />
        <RouterDocumentation title={'getIspTransactions'} description={'gets all token transactions for the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of ISP token transactions'} />
        <RouterDocumentation title={'getIspContracts'} description={"gets all ISP's contracts"} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of ISP contracts'} />
        <RouterDocumentation title={'registerISP'} description={'registers a user as an ISP'} requestType={'Mutation'} procedure={'Protected'} input={'Name, CNPJ'} output={''} />
        <RouterDocumentation title={'buyBenefits'} description={'performs a benefits exchange for the ISP'} requestType={'Mutation'} procedure={'Protected'} input={'Selected Benefit'} output={'Boolean'} />
        <RouterDocumentation title={'ispUnlockedTokens'} description={'gets the amount of unlocked tokens for the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Unlocked tokens'} />
        <RouterDocumentation title={'createContract'} description={'sends a contract request between ISP and School'} requestType={'Mutation'} procedure={'Protected'} input={'School CNPJ'} output={''} />
        <RouterDocumentation title={'getIspSchools'} description={'gets all schools associated with the ISP'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of schools'} />
      </div>
    </div>
  )
}

export default ProvidersRouter
