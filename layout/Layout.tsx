import Head from 'next/head'
import { FC } from 'react'

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Head>
        <title>Tatami</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-12">{children}</main>
    </div>
  )
}

export default Layout
