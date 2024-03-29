import { api } from "~/utils/api"
import type { NextPage } from "next"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import { useRouter } from 'next/router'
import { Role } from "@prisma/client"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"

const Home: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'pt-br' : router.locale
  const userHasAccount = api.generalLogin.userHasAccount.useQuery()
  const userInfo = api.generalLogin.getUserRole.useQuery()
  const isUserAuthorized = api.generalLogin.getAuthorizedRole.useQuery()

  if (isUserAuthorized.data === "not found") return <ErrorMessageComponent locale={locale} />

  if (userHasAccount.data == false) {
    void router.push('/register/redirect')
  }

  if (userHasAccount.data == true) {
    if (!userInfo.data) return <ErrorMessageComponent locale={locale} />

    const userRole: Role = userInfo.data

    switch (userRole) {
      case Role.ADMIN: void router.push('/user/admin/dashboard'); break
      case Role.ISP: void router.push('/user/isp/dashboard'); break
    }
  }

  return (
    <>
      <PageHeader title="Giga Token" />
    </>
  )
}

export default Home
