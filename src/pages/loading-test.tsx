import type { NextPage } from "next"
import { useRouter } from "next/router"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"

const LoadingTest: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  return (
    <>
      <LoadingComponent locale={locale} />
    </>
  )
}

export default LoadingTest