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
import AuthorizeUserIcon from "~/styles/styledComponents/icons/AuthorizeUserIcon"
import AuthorizedIcon from "~/styles/styledComponents/icons/AuthorizedIcon"
import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import DashboardButtonLeft from "~/styles/styledComponents/utils/DashboardButtonLeft"
import DashboardButtonRight from "~/styles/styledComponents/utils/DashboardButtonRight"

const AdminDashboard: NextPage = () => {
  const isAdmin = api.admin.isAdmin.useQuery()

  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale

  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />

  const t = new Translate(locale)

  return (
    <>
      <PageHeader title="Giga Token - ADMIN" />
      <main className="flex h-screen justify-center items-center">
        <div className="w-full max-w-3xl p-6 flex flex-col items-center space-y-4">
          <GigaTokenTitle locale={locale} />
          <div className="grid grid-cols-2 gap-4 w-full">

            <DashboardButtonLeft title={t.t("Create School")} link={"create-school"} RightIcon={SchoolIcon} />
            <DashboardButtonRight title={t.t("School Catalog")} link={"school-catalog"} RightIcon={TableIcon} />
            <DashboardButtonLeft title={t.t("Connectivity Reports")} link={"connectivity-reports"} RightIcon={ConnectivityIcon} />
            <DashboardButtonRight title={t.t("Assign Tokens to School")} link={"assign-tokens-school"} RightIcon={EditIcon} />
            <DashboardButtonLeft title={t.t("Contracts")} link={"contracts"} RightIcon={ContractsIcon} />
            <DashboardButtonRight title={t.t("Unlock ISP Tokens")} link={"unlock-isp-tokens"} RightIcon={UnlockedIcon} />
            <DashboardButtonLeft title={t.t("Authorize User")} link={"authorize-user"} RightIcon={AuthorizeUserIcon} />
            <DashboardButtonRight title={t.t("Authorized Users")} link={"authorized-users"} RightIcon={AuthorizedIcon} />
          </div>
        </div>
      </main>
    </>
  )

}

export default AdminDashboard