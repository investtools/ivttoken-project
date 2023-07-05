import { useRouter } from "next/router"
import RouterDocumentation from "./RouterDoc"
import { Translate } from "translate/translate"

const SchoolsRouter: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div id="schools" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-2xl">
            <h1 className="md:text-4xl text-3xl font-bold mb-6 text-ivtcolor2">{t.t("Schools Router")}</h1>
            <div className='grid md:grid-cols-3 gap-8'>
                <RouterDocumentation title={'getSchoolsToBeApproved'} description={'fetches the list of schools to be approved'} requestType={'Query'} procedure={'Public'} input={''} output={'Array of schools'} />
                <RouterDocumentation title={'schoolToBeApproved'} description={'creates a new school to be approved by admin'} requestType={'Mutation'} procedure={'Public'} input={'Name, State, City, Zip Code, Address, CNPJ, Inep Code, Email, Administrator'} output={''} />
                <RouterDocumentation title={'getLatLon'} description={'fetches the latitude and longitude of the input'} requestType={'Query'} procedure={'Public'} input={'City, State'} output={'Lat and lon'} />
                <RouterDocumentation title={'getAll'} description={'fetches all schools'} requestType={'Query'} procedure={'Public'} input={''} output={'Array of schools'} />
                <RouterDocumentation title={'getAvailable'} description={'fetches the list of available schools'} requestType={'Query'} procedure={'Public'} input={''} output={'Array of schools'} />
                <RouterDocumentation title={'getSchoolsWithTokens'} description={'fetches the list of schools that have token amount'} requestType={'Query'} procedure={'Public'} input={''} output={'Array of schools'} />
                <RouterDocumentation title={'getNoTokensSchools'} description={'fetches the list of schools without tokens'} requestType={'Query'} procedure={'Public'} input={''} output={'Array of schools'} />
                <RouterDocumentation title={'findSchoolNameByCnpj'} description={'fetches the school name'} requestType={'Query'} procedure={'Public'} input={"School's CNPJ"} output={"School's name"} />
                <RouterDocumentation title={'doesSchoolExist'} description={'checks if the school exists'} requestType={'Query'} procedure={'Public'} input={"School's CNPJ"} output={'Boolean'} />
                <RouterDocumentation title={'getSchoolByCnpj'} description={'fetches school'} requestType={'Query'} procedure={'Public'} input={"School's CNPJ"} output={'Array of schools'} />
            </div>
        </div>
    )
}

export default SchoolsRouter
