import type { ReactNode } from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Dokumentace programovaní',
    template: '%s – Dokumentace programovaní',
  },
}

const navbar = (
  <Navbar
    logo={<span>Dokumentace programovaní</span>}
    projectLink="https://github.com/Btihin/programovani-doc/"
    chatLink="https://discordapp.com/users/400651427078471690"
  />
)

const footer = <Footer>Pro sebe - Biti - 2023</Footer>

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Btihin/programovani-doc/tree/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
