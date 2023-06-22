import { SignUp } from "@clerk/nextjs"
import type { NextPage } from "next"

const SignUpPage: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignUp />
        </div>
    )
}

export default SignUpPage