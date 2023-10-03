import SwitchLanguage from "../shared/SwitchLanguage"
import LoginButton from "./LoginButton"
import GoMainBasicButton from "../shared/GoMainBasicButton"
import DevButton from "./DevButton"

type NoNavbarHeaderProps = {
    dev: boolean
}

const NoNavbarHeader: React.FC<NoNavbarHeaderProps> = ({ dev }) => {
    return (
        <div className="z-50 fixed w-full py-2 bg-gradient-to-r border-b from-ivtcolor2 via-hover to-ivtcolor2">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <LoginButton />
                    {dev ? (<GoMainBasicButton />) : (<DevButton />)}
                </div>

                <div className="flex items-center">
                    <SwitchLanguage />
                </div>
            </div>
        </div>
    )
}

export default NoNavbarHeader
