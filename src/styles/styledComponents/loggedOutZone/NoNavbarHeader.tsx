import SwitchLanguage from "../shared/SwitchLanguage"
import USAIcon from "../icons/UsaIcon"
import BrazilIcon from "../icons/BrazilIcon"
import LoginButton from "./LoginButton"
import GoMainBasicButton from "../shared/GoMainBasicButton"

const NoNavbarHeader: React.FC = () => {
    return (
        <div className="z-50 fixed w-full py-2 bg-gradient-to-r border-b from-ivtcolor2 via-hover to-ivtcolor2">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <LoginButton />
                    <GoMainBasicButton />
                </div>

                <div className="flex items-center">
                    <USAIcon />
                    <SwitchLanguage />
                    <BrazilIcon />
                </div>
            </div>
        </div>
    )
}

export default NoNavbarHeader