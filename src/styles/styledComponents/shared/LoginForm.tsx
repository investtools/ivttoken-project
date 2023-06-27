import { SignIn, SignUp } from "@clerk/nextjs"
import Image from 'next/image'
import Link from 'next/link'

type LoginProps = {
    pageName: string
}

const LoginForm: React.FC<LoginProps> = ({ pageName }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="hover:scale-110 duration-500">
                <div className="hover:shadow-2xl flex bg-white hover:border-2 hover:border-ivtcolor2 rounded-lg">
                    {pageName === 'sign-in' ? (<SignIn />) : (<SignUp />)}
                    <div className="grid bg-white z-0 rounded-r border-l border-ivtcolor2 flex items-center justify-center p-10">
                    <Link href="https://www.unicef.org/">
                            <span className='hover:opacity-[.85]'>
                                <Image src="/unicef-blue.png" width={300} height={50} alt="Unicef Logo" />
                            </span>
                        </Link>
                        
                        <Link href='https://giga.global/'>
                            <span className='hover:opacity-[.85] flex justify-center'>
                                <Image src="/giga-blue2.png" width={220} height={50} alt="Giga Logo" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm