import { useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CheckIcon from "~/styles/styledComponents/icons/CheckIcon"
import CopyIcon from "~/styles/styledComponents/icons/CopyIcon"

const env = `DATABASE_URL=
NEXT_PUBLIC_CAPTCHA_KEY=
NEXT_PUBLIC_SLACK_CHANNEL=
NEXT_PUBLIC_SLACK_BOT_TOKEN=
NEXT_PUBLIC_REGISTER_ISP_URL=
NEXT_PUBLIC_REGISTER_ADMIN_URL=
NEXT_PUBLIC_GEOLOCATION_API_KEY=
NEXT_PUBLIC_SLACK_SIGNING_SECRET=`
const clone = 'git clone git@github.com:investtools/ivttoken-project.git'
const cd = 'cd ivttoken-project'
const npmI = 'npm install'
const localDb = 'npm run database:local:prepare'
const dev = 'npm run dev'
const test = 'npm run test'
const build = 'npm run build'

type CopyToClipboardComponentProps = {
    copy: string
}

const CopyToClipboardComponent: React.FC<CopyToClipboardComponentProps> = ({ copy }) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    function toCopy() {
        switch (copy) {
            case 'cd': return cd
            case 'dev': return dev
            case 'env': return env
            case 'npmI': return npmI
            case 'test': return test
            case 'build': return build
            case 'clone': return clone
            case 'localDb': return localDb
        }
    }
    const textToCopy = toCopy()

    return (
        <div className="relative bg-gray-200 rounded p-2 mt-2">
            <pre className="whitespace-normal md:whitespace-pre break-words overflow-auto m-0 md:text-base text-sm">
                {textToCopy}
            </pre>
            <CopyToClipboard text={String(textToCopy)} onCopy={handleCopy}>
                <button className="flex absolute top-0 right-0 bg-ivtcolor hover:bg-hover text-white font-bold py-2 px-3 rounded">
                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                </button>
            </CopyToClipboard>
        </div>

    )
}

export default CopyToClipboardComponent
