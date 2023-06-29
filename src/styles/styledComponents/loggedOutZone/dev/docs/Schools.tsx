import { useRouter } from "next/router"
import RouterDocumentation from "./RouterDoc"
import { Translate } from "translate/translate"

const SchoolsRouter: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div id="schools" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-2xl">
            <h1 className="text-4xl font-bold mb-6 text-ivtcolor2">{t.t("Schools Router")}</h1>
            <div className='grid grid-cols-3 gap-8'>
                <RouterDocumentation title={'getSchoolsToBeApproved'} description={'Fetches the list of schools to be approved'} requestType={'Query'} procedure={'Public'} input={''} output={'Array'} />
                <RouterDocumentation title={'schoolToBeApproved'} description={'Approves a new school'} requestType={'Mutation'} procedure={'Public'} input={'Object'} output={''} />
                <RouterDocumentation title={'getLatLon'} description={'Fetches the latitude and longitude of the input'} requestType={'Query'} procedure={'Public'} input={'String'} output={'Object'} />
                <RouterDocumentation title={'getAll'} description={'Fetches all schools'} requestType={'Query'} procedure={'Public'} input={''} output={'Array'} />
                <RouterDocumentation title={'getAvailable'} description={'Fetches the list of available schools'} requestType={'Query'} procedure={'Public'} input={''} output={'Array'} />
                <RouterDocumentation title={'getSchoolsWithTokens'} description={'Fetches the list of schools with tokens'} requestType={'Query'} procedure={'Public'} input={''} output={'Array'} />
                <RouterDocumentation title={'getNoTokensSchools'} description={'Fetches the list of schools without tokens'} requestType={'Query'} procedure={'Public'} input={''} output={'Array'} />
                <RouterDocumentation title={'findSchoolNameByCnpj'} description={'Fetches the school name by CNPJ'} requestType={'Query'} procedure={'Public'} input={'String'} output={'String'} />
                <RouterDocumentation title={'doesSchoolExist'} description={'Checks if the school exists by CNPJ'} requestType={'Query'} procedure={'Public'} input={'String'} output={'Boolean'} />
                <RouterDocumentation title={'getSchoolByCnpj'} description={'Fetches school by CNPJ'} requestType={'Query'} procedure={'Public'} input={'String'} output={'Object'} />
            </div>
        </div>
    )
}

export default SchoolsRouter
