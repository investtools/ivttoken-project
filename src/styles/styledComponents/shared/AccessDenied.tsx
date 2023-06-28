import { FaLock } from 'react-icons/fa'
import React from 'react'
import { Translate } from "translate/translate"
import GoToMainIvtLogoButton from "./GoToMainIvtLogoButton"
import HomeButton from './HomeButton'
import { useRouter } from 'next/router'

interface AccessDeniedProps {
  locale: string
}

const AccessDeniedMessage: React.FC<AccessDeniedProps> = ({ locale }) => {
  const t = new Translate(locale)

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
          <FaLock className="text-red-500 text-3xl flex justify-center" />
        </div>
        <span className="ml-4 text-2xl font-semibold text-ivtcolor2 flex justify-center">
          {t.t("Access Denied!")}
        </span>
      </div>
      <span className="text-lg font-medium text-ivtcolor2">
        {t.t("You do not have permission to access this page.")}
      </span>
    </div>
  )
}

interface AccessDeniedComponentProps {
  locale: string
  isPathPublic: boolean
  pathName: string
}

const AccessDeniedComponent: React.FC<AccessDeniedComponentProps> = ({ locale, isPathPublic, pathName }) => {
  const router = useRouter()

  return (
    <>
      {pathName === '/' ? void router.push('/main') : (
        <div className="p-8 relative min-h-screen flex flex-col justify-between">
          <div>
            {isPathPublic ? (<HomeButton />) : (<GoToMainIvtLogoButton />)}
          </div>
          <div className="flex-grow flex items-center justify-center">
            <AccessDeniedMessage locale={locale} />
          </div>
        </div>
      )}
    </>
  )
}

export default AccessDeniedComponent