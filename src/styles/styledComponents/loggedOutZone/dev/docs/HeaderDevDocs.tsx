import DevButton from "../../DevButton"
import NavbarDevDocs from "./NavbarDevDocs"
import LoginButton from "../../LoginButton"
import USAIcon from "~/styles/styledComponents/icons/UsaIcon"
import BrazilIcon from "~/styles/styledComponents/icons/BrazilIcon"
import SwitchLanguage from "~/styles/styledComponents/shared/SwitchLanguage"

const HeaderDevDocs: React.FC = () => {
    return (
        <div className="z-50 fixed w-full py-2 bg-gradient-to-r border-b from-ivtcolor2 via-hover to-ivtcolor2">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <LoginButton />
                    <DevButton />
                </div>

                <div>
                    <NavbarDevDocs />
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

export default HeaderDevDocs