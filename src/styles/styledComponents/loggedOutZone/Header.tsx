import SwitchLanguage from "../shared/SwitchLanguage"
import Navbar from "./Navbar"
import LoginButton from "./LoginButton"
import DevButton from "./DevButton"
import { isDeviceDesktop } from "~/utils/functions/sharedFunctions"

const Header: React.FC = () => {
    const isDesktop = isDeviceDesktop()

    const mobile = () => {
        return (
            <div className="fixed w-full z-50 py-2 border-b bg-gradient-to-r from-ivtcolor2 via-hover to-ivtcolor2">
                <div className="p-1 md:flex md:justify-between">
                    <div className="order-1 md:order-1 flex justify-between">
                        <div className="flex gap-2 mb-2 md:mb-0">
                            <LoginButton />
                            <DevButton />
                        </div>
                        <div className="flex items-center mb-2 md:mb-0 md:order-3">
                            <SwitchLanguage />
                        </div>
                    </div>

                    <div className="order-2 md:order-2 mb-2 md:mb-0 md:mx-auto">
                        <Navbar />
                    </div>
                </div>
            </div>
        )
    }

    const desktop = () => {
        return (
            <div className="z-50 fixed w-full py-2 bg-gradient-to-r border-b from-ivtcolor2 via-hover to-ivtcolor2">
                <div className="w-11/12 mx-auto flex justify-between items-center">
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <LoginButton />
                        <DevButton />
                    </div>

                    <div>
                        <Navbar />
                    </div>

                    <div className="flex items-center">
                        <SwitchLanguage />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {isDesktop ? desktop() : mobile()}
        </>
    )
}

export default Header
