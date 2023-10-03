import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Translate } from "translate/translate"
import SendIcon from '../icons/SendIcon'
import XMark from '../icons/XMarkIcon'
import FormSentModal from './FormSentModal'
import IncompleteFieldsModal from './IncompleteFieldsModal'
import { api } from '~/utils/api'
import AuthorizedIcon from '../icons/AuthorizedIcon'

interface ChatMessageProps {
  message: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [content, fromInfo] = message.split('FROM:')
  const [role, nameAndOrg] = (String(fromInfo)).split('+')
  const isISP = role === 'ISP'

  return (
    <div className={`grid mb-2 ${isISP ? 'justify-start' : 'justify-end'}`}>
      <div className={`p-3 rounded-lg ${isISP ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'}`}>
        {content?.trim()}
      </div>
      <div className={`text-xs text-gray-500 ${isISP ? 'ml-3' : 'mr-3'}`}>
        {nameAndOrg}
      </div>
    </div>
  )
}

const MessageHeader = ({ label, value, locale }: { label: string, value: string, locale: string }) => {
  const t = new Translate(locale)
  return (
    <div>
      <label className="block text-ivtcolor2 font-bold" htmlFor="subject">
        {t.t(label)}
      </label>
      <div className='shadow appearance-none border w-full py-2 px-3 text-ivtcolor2 leading-tight  focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 border-ivtcolor p-2 rounded-lg focus-visible:ring-offset-ivtcolor'>
        {value}
      </div>
    </div>
  )
}

interface AnswerModalProps {
  closeModal: () => void
  locale: string
  ispName: string
  helpSubject: string
  helpMessage: string
  ispEmail: string
  helpId: string
  messages: string[]
}

export default function AnswerModal({ closeModal, locale, ispName, helpSubject, helpMessage, ispEmail, helpId, messages }: AnswerModalProps) {
  const t = new Translate(locale)
  const [isOpen] = useState(true)
  const [message, setMessage] = useState("")
  const [sentFormModalIsOpen, setSentFormModalIsOpen] = useState(false)
  const [incompleteFieldsModalIsOpen, setIncompleteFieldsModalIsOpen] = useState(false)
  const [componentMessages, setComponentMessages] = useState(messages)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const { mutate } = api.admin.answerISP.useMutation()
  const { mutate: closeHelp } = api.admin.closeISPHelp.useMutation()

  const handleSubmit = (message: string, to: string, helpId: string) => {
    if (!message) return setIncompleteFieldsModalIsOpen(true)
    mutate({ message, subject: `Re: ${helpSubject}`, to, helpId })
    setMessage("")
    setComponentMessages(prevMessages => [...prevMessages, `${message}`])
  }

  const handleCloseSentFormModal = () => {
    setSentFormModalIsOpen(false)
    closeModal()
  }

  const handleCloseHelp = (helpId: string) => {
    closeHelp({ helpId })
    setSentFormModalIsOpen(true)
  }

  useEffect(() => {
    const current = messagesEndRef.current
    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }, [componentMessages])

  useEffect(() => {
    const current = messagesEndRef.current
    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }, [])

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
                <Dialog.Panel className="hover:scale-110 duration-500 hover:shadow-2xl hover:border-ivtcolor2 hover:border-2 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {sentFormModalIsOpen && (
                    <FormSentModal closeModal={handleCloseSentFormModal} locale={locale} />
                  )}
                  {incompleteFieldsModalIsOpen && (
                    <IncompleteFieldsModal closeIncompleteFieldModal={() => setIncompleteFieldsModalIsOpen(false)} locale={locale} />
                  )}
                  <div className="flex justify-between items-center">
                    <Dialog.Title as="h3" className="font-extrabold text-2xl leading-6 text-ivtcolor2">
                      {t.t("Answer")}
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="slide-in-blurred-top inline-flex justify-center rounded-full border border-transparent bg-ivtcolor font-bold text-white hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      <XMark />
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-3 space-x-2">
                    <MessageHeader label='Provider' locale={locale} value={ispName} />
                    <MessageHeader label='Subject' locale={locale} value={helpSubject} />
                    <MessageHeader label='Message' locale={locale} value={helpMessage} />
                  </div>

                  <div className='grid grid-cols-3 items-center mt-4'>
                    <div className='border-b-2 border-gray-200 mx-4'></div>
                    <span className='md:text-lg text-sm text-ivtcolor2 font-extrabold text-center'>{t.t("Your Response")}</span>
                    <div className='border-b-2 border-gray-200 mx-4'></div>
                  </div>

                  <div className="mb-4 mt-4 overflow-y-auto max-h-60" ref={messagesEndRef}>
                    {componentMessages.map((msg, index) => (
                      <ChatMessage key={index} message={msg} />
                    ))}
                  </div>

                  <div className="mb-2">
                    <label className="block text-ivtcolor2 font-bold mb-2" htmlFor="message">
                      {t.t("Message")}
                    </label>
                    <textarea
                      className="shadow appearance-none border w-full py-2 px-3 text-ivtcolor2 leading-tight  focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 border-ivtcolor p-2 rounded-lg focus-visible:ring-offset-ivtcolor"
                      id="message"
                      placeholder={t.t("Message")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-between ">
                    <button
                      type="button"
                      className="gradient-animation font-bold inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={(event) => {
                        event.preventDefault()
                        handleSubmit(message, ispEmail, helpId)
                      }}
                    >
                      {t.t('Send')}
                      <SendIcon />
                    </button>

                    <button
                      type="button"
                      className="gradient-animation font-bold inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={(event) => {
                        event.preventDefault()
                        handleCloseHelp(helpId)
                      }}
                    >
                      {t.t('Close Ticket')}
                      <AuthorizedIcon strokeWidth='1' size='8' />
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
