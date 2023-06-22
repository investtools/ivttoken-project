import { SignIn } from "@clerk/nextjs"
import type { NextPage } from "next"

const LoginRegister: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    )
}

export default LoginRegister