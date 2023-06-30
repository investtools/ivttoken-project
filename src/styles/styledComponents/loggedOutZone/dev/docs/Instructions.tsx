import { useRouter } from 'next/router'
import React from 'react'
import { Translate } from 'translate/translate'
import Link from 'next/link'
import CopyToClipboardComponent from './CopyToClipboard'

const Instructions: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div id="instructions" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-2xl">
            <h1 className="text-4xl font-bold mb-6 text-ivtcolor2">{t.t("Instructions")}</h1>
            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2">{t.t("Environment Setup")}</h2>
            <p className='font-bold'>{t.t("Before you begin, you will need to install ")}<Link href="https://nodejs.org/en/download/"><span className="text-hover font-extrabold">Node.js</span></Link>{t.t(" and ")}<Link href="https://www.npmjs.com/get-npm"><span className="text-hover font-extrabold">npm</span></Link>{t.t(" (which comes with Node.js) on your machine.")}</p>
            <p className='font-bold'>{t.t("Additionally, you will need to create a ")}<span className='text-hover font-extrabold'>.env</span>{t.t(' file at the root of the project with the following environment variables')}:</p>
            <CopyToClipboardComponent copy={'env'} />
            <p className='font-bold'>{t.t("Fill in the fields with the appropriate information.")}</p>

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">{t.t("Installation Instructions")}</h2>
            <div>
                <span className='font-bold text-hover'>1. </span><span className='font-bold'>{t.t("Clone this repository to your local machine:")}</span>
                <CopyToClipboardComponent copy={'clone'} />

                <span className='font-bold text-hover'>2. </span><span className='font-bold'>{t.t("Navigate to the project directory:")}</span>
                <CopyToClipboardComponent copy={'cd'} />

                <span className='font-bold text-hover'>3. </span><span className='font-bold'>{t.t("Install the project dependencies:")}</span>
                <CopyToClipboardComponent copy={'npmI'} />

                <span className='font-bold text-hover'>4. </span><span className='font-bold'>{t.t("Prepare the local database:")}</span>
                <CopyToClipboardComponent copy={'localDb'} />
            </div>

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">{t.t("Running the Project")}</h2>
            <p className='font-bold'>{t.t("To run the project locally, use the following command:")}</p>
            <CopyToClipboardComponent copy={'dev'} />
            <p className='font-bold'>{t.t("The project will run on port 3000 unless you have set a different port in your .env file.")}</p>

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">{t.t("Running the Tests")}</h2>
            <p className='font-bold'>{t.t("To run the tests, use the following command:")}</p>
            <CopyToClipboardComponent copy={'test'} />

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">{t.t("Building the Project")}</h2>
            <p className='font-bold'>{t.t("To build the project for production, use the following command:")}</p>
            <CopyToClipboardComponent copy={'build'} />

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">CI/CD</h2>
            <p className='font-bold'>{t.t("This project uses GitHub Actions to implement a Continuous Integration/Continuous Delivery (CI/CD) pipeline. The pipeline is triggered whenever a new commit is made to the main branch. It installs dependencies, prepares the local database, runs tests, and builds the project for production.")}</p>

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">{t.t("Contribution")}</h2>
            <p className='font-bold'>{t.t("Contributions to this project are welcome. To contribute, please fork the repository, make your changes, and submit a pull request.")}</p>

            <h2 className="text-2xl font-bold mb-2 text-ivtcolor2 mt-8">{t.t("Contact")}</h2>
            <p className='font-bold'>{t.t("If you have any questions or comments about this project, feel free to open a issue!")}</p>
            <ul className="list-disc list-inside">
                <li><Link href="https://github.com/investtools/ivttoken-project/blob/main/ISSUE_TEMPLATE.md"><span className="text-hover font-bold">Issues Template</span></Link></li>
                <li><Link href="https://github.com/investtools/ivttoken_frontend/issues"><span className="text-hover font-bold">Issues</span></Link></li>
                <li><Link href="https://ivttoken.vercel.app/dev/open-ticket"><span className="text-hover font-bold">Ticket</span></Link></li>
            </ul>
        </div>
    )
}

export default Instructions