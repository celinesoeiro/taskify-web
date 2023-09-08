import './globals.css'
import type { Metadata } from 'next'
import { Calistoga, Nunito } from 'next/font/google'

const calistogaFont = Calistoga({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-calistoga',
})
const nunitoFont = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Manage your tasks for the day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${calistogaFont.variable} ${nunitoFont.variable} bg-orange-100 font-sans`}>{children}</body>
    </html>
  )
}
