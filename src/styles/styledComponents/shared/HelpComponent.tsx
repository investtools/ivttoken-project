import { useState } from "react"
import QuestionIcon from "../icons/QuestionIcon"
import ISPHelpModal from "../modals/ISPHelpModal"

type HelpProps = {
    locale: string
}

const HelpComponent: React.FC<HelpProps> = ({ locale }) => {
    const [ispHelpModalIsOpen, setISPHelpModalIsOpen] = useState(false)

    const handleClick = () => {
        setISPHelpModalIsOpen(true)
    }

    return (
        <>
            {ispHelpModalIsOpen && (
                <ISPHelpModal closeModal={() => setISPHelpModalIsOpen(false)} locale={locale} />
            )}
            <div className={`fixed bottom-6 right-4 z-10 flex justify-center items-center bg-ivtcolor rounded-full`}>
                <button onClick={handleClick}>
                    <QuestionIcon className="w-12 h-12 text-ivtcolor2" />
                </button>
            </div>
        </>
    )
}

export default HelpComponent
