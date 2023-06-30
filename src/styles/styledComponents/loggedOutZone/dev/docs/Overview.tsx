import { useRouter } from 'next/router'
import React from 'react'
import { Translate } from 'translate/translate'

const Overview: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div id="overview" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-b-2xl">
            <h1 className="text-4xl font-bold mb-6 text-ivtcolor2">{t.t("Project Overview")}</h1>
            <h2 className="text-2xl font-bold mb-4 text-ivtcolor2">{t.t("Technologies Used")}</h2>

            <div className='space-y-5'>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-ivtcolor2">Frontend</h3>
                        <ul className="list-disc pl-5">
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a></li>
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ivtcolor2">Backend</h3>
                        <ul className="list-disc pl-5">
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://trpc.io/" target="_blank" rel="noreferrer">tRPC</a></li>
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ivtcolor2">{t.t("Database")}</h3>
                        <ul className="list-disc pl-5">
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">PostgreSQL</a></li>
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://www.prisma.io/" target="_blank" rel="noreferrer">Prisma</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ivtcolor2">{t.t("Testing")}</h3>
                        <ul className="list-disc pl-5">
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://jestjs.io/" target="_blank" rel="noreferrer">Jest</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ivtcolor2">DevOps</h3>
                        <ul className="list-disc pl-5">
                            <li className='text-hover font-extrabold transform transition duration-500 ease-in-out hover:scale-110 w-fit'><a href="https://github.com/investtools/ivttoken-project/actions" target="_blank" rel="noreferrer">GitHub Actions (CI/CD)</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2 text-ivtcolor2">{t.t("About the Project")}</h2>
                    <p className="indent font-bold">
                        {t.t("Giga Token is a social impact project in collaboration with UNICEF aimed at reducing the digital divide by connecting underprivileged schools to the internet. The project utilizes a blockchain - based token, GigaToken (GIGA), to incentivize Internet Service Providers (ISPs) to connect schools to the internet. ISPs can earn GigaTokens by connecting schools to the internet and ensuring the quality of the connection. These tokens can be exchanged for tax incentives or other rewards. The project is designed to enhance educational opportunities for underprivileged students by providing access to online resources and promoting digital inclusion.")}
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2 text-ivtcolor2">{t.t("Contributing")}</h2>
                    <p className="indent font-bold">
                        {t.t("We encourage contributions of all forms. Please refer to the documentation for technical details. If you have any questions or need help understanding a part of the codebase, feel free to open an ")}
                        <a href="https://github.com/investtools/ivttoken-project/issues" target="_blank" rel="noopener noreferrer" className="underline text-ivtcolor2 hover:text-ivtcolor3">
                            {t.t("issue")}
                        </a>
                        {t.t(" or a ")}
                        <a href="https://ivttoken.vercel.app/dev/open-ticket" target="_blank" rel="noopener noreferrer" className="underline text-ivtcolor2 hover:text-ivtcolor3">
                            {t.t("ticket")}
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Overview