import { api } from "~/utils/api"
import LoadingComponent from "~/styles/styledComponents/shared/Loading"
import PageHeader from "~/styles/styledComponents/shared/PageHeader"
import FormSentModal from "~/styles/styledComponents/modals/FormSentModal"
import IncompleteFieldsModal from "~/styles/styledComponents/modals/IncompleteFieldsModal"
import { Fragment, useState } from 'react'
import SendIcon from "~/styles/styledComponents/icons/SendIcon"
import HomeButton from "~/styles/styledComponents/shared/HomeButton"
import ErrorMessageComponent from "~/styles/styledComponents/shared/ErrorMessage"
import { useRouter } from "next/router"

const RegisterSuperUser: React.FC = () => {
  const router = useRouter()
  const locale = router.locale === undefined ? 'en' : router.locale

  const [name, setName] = useState('')
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)

  const userHasAccount = api.generalLogin.getUserRole.useQuery()
  const { mutate, isLoading } = api.superUser.registerSuperUser.useMutation()

  if (isLoading) return <LoadingComponent locale={locale} />

  const handleSubmit = (name: string) => {
    if (name) {
      try {
        mutate({ name })
        setSentFormModalIsOpen(true)
      } catch (error) {
        console.log(error)
        return null
      }
    } else {
      setIncompleteFieldsModalIsOpen(true);
    }
  }

  return (
    <>
      <PageHeader title="Sign-in" />
      {sentFormModalIsOpen && (
        <FormSentModal closeModal={() => setSentFormModalIsOpen(false)} locale={locale} />
      )}
      {incompleteFieldsModalIsOpen && (
        <IncompleteFieldsModal closeModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
      )}
      {userHasAccount.data ? (
        <ErrorMessageComponent locale={locale} />
      ) : (
        <div className="p-8">
          <HomeButton />
          <div>
            <div className="flex justify-center items-top p-5">
              <form className="bg-white p-10 rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-bold mb-8 text-gray-900">Register Your Credentials</h1>
                <div className="flex flex-col mb-4">
                  <label htmlFor="name" className="mb-2 font-bold text-lg text-gray-900">
                    Name:
                  </label>
                  <input
                    placeholder="John Doe"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-400 p-2 rounded-lg text-gray-900"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      handleSubmit(name)
                    }}
                    className="bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-4 rounded-full"
                  >
                    <span className="flex items-center">
                      Register Super User
                      <SendIcon />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RegisterSuperUser