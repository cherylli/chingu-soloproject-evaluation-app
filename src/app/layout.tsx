import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@/components/theme-provider";
import Nav from "@/components/Nav";
import AuthProvider from "@/context/AuthProvider";
import Maintenance from "@/components/Maintenance";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Chingu Solo Project',
    description: 'Chingu Solo Project Evaluation App',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') {
        return <Maintenance/>
    }
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Nav/>
                {children}
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    )
}
