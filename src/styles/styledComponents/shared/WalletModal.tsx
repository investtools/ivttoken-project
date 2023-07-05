import React, { useState } from 'react'
import { api } from '~/utils/api'
import ErrorMessageComponent from './ErrorMessage'
import XMarkIcon from '../icons/XMarkIcon'
import { Translate } from "translate/translate"
import Underline from './Underline'

type WalletModalProps = {
  isOpen: boolean
  onClose: () => void
  locale: string
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, locale }) => {
  const [isExiting, setIsExiting] = useState(false)
  const { data } = api.internetServiceProviders.getIspData.useQuery()
  if (!data) return <ErrorMessageComponent locale={locale} />
  const t = new Translate(locale)

  const handleCloseModal = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsExiting(false)
      onClose()
    }, 500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed z-40 inset-0">
      <div>
        <div
          className="absolute top-0 left-0 w-full bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleCloseModal}
        ></div>
        <div className="relative">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className={`md:w-3/12 w-7/12 gradient-animation mt-[53px] md:ml-[150px] ml-[75px] p-4 rounded-lg text-left shadow-xl transform transition-all ${isExiting ? 'slide-out-blurred-left' : 'slide-in-blurred-left'}`}>
            <div className="flex justify-between items-center pb-3">
              <h2 className="text-xl border p-1 rounded bg-gray-100 shadow-2xl font-bold ">{t.t("Balance")}</h2>
              <button className="p-1 hover:text-xhover hover:shadow-none hover:bg-transparent" onClick={handleCloseModal}>
                <XMarkIcon />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 shadow-2xl text-gray-900">
              {Object.keys(data).map((key, index) => {
                if (
                  key === 'tokenAmount' ||
                  key === 'unlockedTokens' ||
                  key === 'lockedTokens' ||
                  key === 'spentTokens' ||
                  key === 'tokensHistory'
                ) {
                  const typedKey = key
                  return (
                    <div key={index} className="bg-gray-100 p-4 rounded shadow-2xl slide-in-blurred-left">
                      <h3 className="text-ivtcolor2 font-semibold">
                        {key === 'tokenAmount'
                          ? t.t('Token Amount')
                          : key === 'unlockedTokens'
                            ? t.t('Unlocked Tokens')
                            : key === 'lockedTokens'
                              ? t.t('Locked Tokens')
                              : key === 'spentTokens'
                                ? t.t('Spent Tokens')
                                : t.t('Tokens History')}
                        <Underline />
                      </h3>
                      <p>{String(data[typedKey])} Giga Tokens</p>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletModal