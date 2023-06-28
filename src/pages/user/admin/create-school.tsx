import { api } from "~/utils/api"
import HomeButton from "../../../styles/styledComponents/shared/HomeButton"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import { useRouter } from "next/router"
import CreateSchoolComponent from "~/styles/styledComponents/shared/CreateSchoolComponent"

function CreateSchool() {
  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale

  const { mutate } = api.admin.createSchool.useMutation()

  const isAdmin = api.admin.isAdmin.useQuery()
  if (isAdmin.data == false) return <ErrorMessageComponent locale={locale} />
  if (isAdmin.isLoading) return <LoadingComponent locale={locale} />

  return (
    <>
      <div className="p-8">
        <HomeButton />
        <CreateSchoolComponent isModal={false} mutate={mutate} closeModal={() => ""} />
      </div>
    </>
  )
}

export default CreateSchool