import { useRouter } from 'next/router'
import React from 'react'
import { Translate } from 'translate/translate'
import RouterDocumentation from './RouterDoc'

const LoginRouter: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div id="login" className="p-8 max-w-6xl mx-auto bg-white rounded-2xl">
            <h1 className="text-4xl font-bold mb-6 text-ivtcolor2">{t.t("Login Router")}</h1>
            <div className='grid grid-cols-3 gap-8'>
                <RouterDocumentation title={'userHasAccount'} description={'Checks if the user already has an account'} requestType={'Query'} procedure={'Protected'} input={''} output={'boolean'} />
                <RouterDocumentation title={'getAuthorizedRole'} description={'Checks if the is authorized to login'} requestType={'Query'} procedure={'Protected'} input={''} output={'boolean'} />
                <RouterDocumentation title={'getUserRole'} description={'Gets the role that the user is authorized'} requestType={'Query'} procedure={'Protected'} input={''} output={'boolean'} />
            </div>
        </div>
    )
}

export default LoginRouter