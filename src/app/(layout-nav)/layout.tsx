import type { ReactNode } from 'react'

// import Header from '@common/header/header'
import { CookiesProvider } from 'next-client-cookies/server'

const HeaderLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <CookiesProvider>
            {/* <Header /> */}
            <main>{children}</main>
        </CookiesProvider>
    )
}

export default HeaderLayout
