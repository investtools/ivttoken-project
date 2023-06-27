import type { NextPage } from "next"
import LoginForm from "~/styles/styledComponents/shared/LoginForm"

const SignUpPage: NextPage = () => {
    return (
        <LoginForm pageName={"sign-up"} />
    )
}

export default SignUpPage