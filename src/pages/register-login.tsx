import type { NextPage } from "next"
import LoginForm from "~/styles/styledComponents/shared/LoginForm"

const LoginRegister: NextPage = () => {
    return (
        <LoginForm pageName={"sign-in"} />
    )
}

export default LoginRegister