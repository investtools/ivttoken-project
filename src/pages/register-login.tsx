import { SignIn } from "@clerk/nextjs"
import type { NextPage } from "next"

const LoginRegister: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <div className="border-2 rounded-lg hover:shadow-2xl backdrop-blur-[1px]">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default LoginRegister