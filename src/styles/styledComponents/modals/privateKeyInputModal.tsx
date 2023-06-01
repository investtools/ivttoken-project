import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Translate } from 'translate'

interface PrivateKeyInputModalProps {
    onPrivateKeySubmit: (key: string) => void
    closeModal: () => void
    locale: string
  }

export default function PrivateKeyInputModal({ closeModal, onPrivateKeySubmit, locale }: PrivateKeyInputModalProps) {
  const t = new Translate(locale)
  const [privateKey, setPrivateKey] = useState('')
  const [isOpen] = useState(true)


  const handleSubmit = () => {
    onPrivateKeySubmit(privateKey)
    closeModal()
    window.location.reload()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
                    {t.t("Enter your private key:")}
                  </Dialog.Title>
                  <div className="mt-2">
                    <input 
                      type="text" 
                      className="w-full p-2 border-2 border-gray-300 rounded mt-2"
                      placeholder={t.t("Your private key")} 
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-ivtcolor2 px-4 py-2 text-sm font-medium text-white hover:bg-ivtcolor2hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      {t.t("Submit")}
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
