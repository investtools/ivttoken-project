import type { NextPage } from "next"
import { useRouter } from "next/router"
import LoadingComponent from "~/styles/styledComponents/utils/Loading"

const LoadingTest: NextPage = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? "pt-br" : router.locale
  return (
    <>
      <LoadingComponent locale={locale} />
    </>
  )
}

export default LoadingTest
