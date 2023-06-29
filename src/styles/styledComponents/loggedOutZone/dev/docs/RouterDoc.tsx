import { useRouter } from 'next/router'
import React from 'react'
import { Translate } from 'translate/translate'

interface RouteDocProps {
    input: string
    title: string
    output: string
    procedure: string
    requestType: string
    description: string
}

const RouterDocumentation: React.FC<RouteDocProps> = ({ title, description, requestType, input, output, procedure }) => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div className="mb-4 hover:scale-110 border-4 border-transparent hover:border-hover transition duration-500 grid card-shadow grid-cols-1 rounded p-6 flex-col justify-between items-start transform">
            <div>
                <h3 className="text-xl mb-1 font-bold text-ivtcolor2">{title}:</h3>
                <p className="mb-2 text-sm text-gray-500">{t.t(description)}</p>
                <div className='grid grid-cols-2'>
                    {requestType === 'Mutation' ? (<><p className="mb-2"><span className="border-b-2 text-ivtcolor2 font-bold border-ivtcolor2 inline-block">{t.t("Input")}:</span></p><p className='font-extrabold text-hover'>{input}</p></>) : ""}
                    <p className="mb-2"><span className="border-b-2 text-ivtcolor2 font-bold border-ivtcolor2 inline-block">{t.t("Output")}:</span></p> <p className='font-extrabold text-hover'>{output}</p>
                    <p className="mb-2"><span className="border-b-2 text-ivtcolor2 font-bold border-ivtcolor2 inline-block">{t.t("Procedure")}:</span></p> <p className='font-extrabold text-hover'>{t.t(procedure)}</p>
                    <p className="mb-2"><span className="border-b-2 text-ivtcolor2 font-bold border-ivtcolor2 inline-block">{t.t("Request Type")}:</span></p> <p className='font-extrabold text-hover'>{requestType}</p>
                </div>
            </div>
        </div>
    )
}

export default RouterDocumentation
