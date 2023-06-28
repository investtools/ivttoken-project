import { Dialog, Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { api } from '~/utils/api'
import CreateSchoolComponent from '../shared/CreateSchoolComponent'

interface CreateSchoolModalProps {
    closeModal: () => void
}

function CreateSchoolModal({ closeModal }: CreateSchoolModalProps) {
    const [isOpen] = useState(true)
    const { mutate } = api.schools.schoolToBeApproved.useMutation()
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto z-40" onClose={closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&nbsp;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div className="inline-block align-bottom bg-transparent px-4 pt-5 pb-4 text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <CreateSchoolComponent isModal={true} mutate={mutate} closeModal={closeModal} />
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CreateSchoolModal
