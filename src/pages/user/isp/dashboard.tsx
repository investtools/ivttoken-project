import { api } from "~/utils/api"
import type { NextPage } from "next"
import PageHeader from "~/styles/styledComponents/utils/PageHeader"
import TableIcon from "~/styles/styledComponents/icons/TableIcon"
import WalletIcon from "~/styles/styledComponents/icons/WalletIcon"
import GigaTokenTitle from "~/styles/styledComponents/utils/GigaTokenTitle"
import ErrorMessageComponent from "~/styles/styledComponents/utils/ErrorMessage"
import LoadingComponent from "~/styles/styledComponents/utils/Loading"
import BenefitsIcon from "~/styles/styledComponents/icons/BenefitsIcon"
import ContractsIcon from "~/styles/styledComponents/icons/ContractsIcon"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import SchoolIcon from "~/styles/styledComponents/icons/SchoolIcon"
import DashboardButtonRight from "~/styles/styledComponents/utils/DashboardButtonRight"
import DashboardButtonLeft from "~/styles/styledComponents/utils/DashboardButtonLeft"

const ISPDashboard: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const isIsp = api.internetServiceProviders.isIsp.useQuery()
  if (isIsp.data == false) return <ErrorMessageComponent locale={locale} />
  if (isIsp.isLoading) return <LoadingComponent locale={locale} />

  return (
    <>
      <PageHeader title={t.t("Giga Token - PROVIDER")} />
      <main className="flex h-screen justify-center items-center">
        <div className="w-full max-w-3xl p-6 flex flex-col items-center space-y-4">
          <GigaTokenTitle locale={locale} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <DashboardButtonLeft title={t.t("Benefits")} link={"benefits"} RightIcon={BenefitsIcon} />
            <DashboardButtonRight title={t.t("My Contracts")} link={"my-contracts"} RightIcon={ContractsIcon} />
            <DashboardButtonLeft title={t.t("School Catalog")} link={"school-catalog"} RightIcon={TableIcon} />
            <DashboardButtonRight title={t.t("My Information")} link={"my-information"} RightIcon={WalletIcon} />
            <DashboardButtonLeft title={t.t("My Schools")} link={"my-schools"} RightIcon={SchoolIcon} />
          </div>
        </div>
      </main>
    </>
  )
}

export default ISPDashboard