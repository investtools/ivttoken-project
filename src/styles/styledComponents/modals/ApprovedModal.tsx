import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Translate } from "translate/translate"

interface ApproveModalProps {
  closeModal: () => void
  locale: string
  title: string
}

export default function ApproveModal({ closeModal, locale, title }: ApproveModalProps) {
  const router = useRouter()
  const [isOpen] = useState(true)
  const t = new Translate(locale)

  const isIsp = title === 'isp'

  const stayHere = () => {
    closeModal()
  }

  const goToAuthorizedUsers = () => {
    void router.push('/user/admin/authorized-users')
    closeModal()
  }

  const goToSchoolCatalog = () => {
    void router.push('/user/admin/school-catalog')
    closeModal()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={stayHere}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    {isIsp ? t.t("Provider successfully approved!") : t.t("School successfully approved!")}
                  </Dialog.Title>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-ivtcolor2 px-4 py-2 text-sm font-medium text-white hover:bg-ivtcolor2hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={stayHere}>
                      {t.t("Stay Here")}
                    </button>

                    <button
                        type="button"
                        className=" justify-center rounded-md border border-transparent bg-ivtcolor2 px-4 py-2 text-sm font-medium text-white hover:bg-ivtcolor2hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={isIsp ? goToAuthorizedUsers : goToSchoolCatalog}>
                        {t.t("Go To")}&nbsp;<span className="font-bold italic">{isIsp ? t.t("Authorized Users") : t.t("School Catalog")}</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
