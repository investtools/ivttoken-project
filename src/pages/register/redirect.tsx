import { api } from "~/utils/api"
import { useRouter } from 'next/router'
import type { NextPage } from "next"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import { Translate } from "translate/translate"
import { Role } from "@prisma/client"

const RegisterRedirect: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale
  const t = new Translate(locale)

  const userHasAccount = api.generalLogin.getUserRole.useQuery()
  const userAuthorizedRole = api.generalLogin.getAuthorizedRole.useQuery()

  if (userAuthorizedRole.isLoading) return <LoadingComponent locale={locale} />
  if (!userAuthorizedRole.data) return <ErrorMessageComponent locale={locale} />

  const sendUserToHome = () => {
    void router.push('/')
  }

  if (userAuthorizedRole.data === Role.ADMIN && process.env.NEXT_PUBLIC_REGISTER_ADMIN_URL) {
    void router.push(`/register/admin-${process.env.NEXT_PUBLIC_REGISTER_ADMIN_URL}`)
  }

  if (userAuthorizedRole.data === Role.ISP && process.env.NEXT_PUBLIC_REGISTER_ISP_URL) {
    void router.push(`/register/isp-${process.env.NEXT_PUBLIC_REGISTER_ISP_URL}`)
  }

  if (userAuthorizedRole.data === Role.SCHOOL && process.env.NEXT_PUBLIC_REGISTER_SCHOOL_ADMIN_URL) {
    void router.push(`/register/school-admin-${process.env.NEXT_PUBLIC_REGISTER_SCHOOL_ADMIN_URL}`)
  }

  return (
    <>
      <PageHeader title={t.t("Sign-Up")} />
      {userHasAccount.data ? (sendUserToHome()) : (<LoadingComponent locale={locale} />)}
    </>
  )
}

export default RegisterRedirect