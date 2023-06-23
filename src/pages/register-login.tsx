import { SignIn } from "@clerk/nextjs"
import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from "next"

const LoginRegister: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="hover:scale-110 duration-500">
                <div className="hover:shadow-2xl flex bg-white hover:border-2 hover:border-ivtcolor2 rounded-lg">
                    <SignIn />
                    <div className="bg-white z-0 rounded-r border-l border-ivtcolor2 flex items-center justify-center p-10">
                        <Link href={'/main'}>
                            <span className='hover:opacity-[.85]'>
                                <Image src="/images/logo.svg" alt="InvestTools Logo" width={300} height={50} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister