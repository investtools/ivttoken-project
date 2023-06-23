import { SignIn } from "@clerk/nextjs"
import type { NextPage } from "next"

const LoginRegister: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className=" ">
                <div className="border-2 rounded-lg hover:scale-110 duration-500 hover:shadow-2xl hover:border-hover backdrop-blur-md">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default LoginRegister