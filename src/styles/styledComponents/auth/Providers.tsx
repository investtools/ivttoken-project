"use client"
import { SessionProvider } from "next-auth/react"
import React, { type ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Providers = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

export default Providers
