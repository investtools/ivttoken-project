import type { NextPage } from "next"
import PageHeader from "~/styles/styledComponents/utils/PageHeader"
import TableIcon from "~/styles/styledComponents/icons/TableIcon"
import UnlockedIcon from "~/styles/styledComponents/icons/UnlockedIcon"
import SchoolIcon from "~/styles/styledComponents/icons/SchoolIcon"
import GigaTokenTitle from "~/styles/styledComponents/utils/GigaTokenTitle"
import { api } from "~/utils/api"
import ErrorMessageComponent from "~/styles/styledComponents/utils/ErrorMessage"
import ConnectivityIcon from "~/styles/styledComponents/icons/ConnectivityIcon"
import LoadingComponent from "~/styles/styledComponents/utils/Loading"
import ContractsIcon from "~/styles/styledComponents/icons/ContractsIcon"
import EditIcon from "~/styles/styledComponents/icons/EditIcon"
import { useRouter } from "next/router"
import DashboardButtonRight from "~/styles/styledComponents/utils/DashboardButtonRight"
import DashboardButtonLeft from "~/styles/styledComponents/utils/DashboardButtonLeft"

const UserDashboard: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale

  const isSuperUser = api.superUser.isSuperUser.useQuery()
  if (isSuperUser.data == false) return <ErrorMessageComponent locale={locale} />
  if (isSuperUser.isLoading) return <LoadingComponent locale={locale} />

  return (
    <>
      <PageHeader title="Giga Token - SUPER-USER" />
      <main className="flex h-screen justify-start">
        <div className="w-full max-w-3xl p-6 flex flex-col items-start space-y-4">
          <GigaTokenTitle locale={locale} />

          <DashboardButtonLeft title={"Contracts"} link={"contracts"} RightIcon={ContractsIcon} />
          <DashboardButtonRight title={"Create School"} link={"create-school"} RightIcon={SchoolIcon} />
          <DashboardButtonLeft title={"School Catalog"} link={"school-catalog"} RightIcon={TableIcon} />
          <DashboardButtonRight title={"Unlock ISP Tokens"} link={"unlock-isp-tokens"} RightIcon={UnlockedIcon} />
          <DashboardButtonLeft title={"Connectivity Reports"} link={"connectivity-reports"} RightIcon={ConnectivityIcon} />
          <DashboardButtonRight title={"Assign Tokens to School"} link={"assign-tokens-school"} RightIcon={EditIcon} />
        </div>
      </main>
    </>
  )
}

export default UserDashboard