import type { Metadata } from 'next'
import './globals.css'
import { DashboardLayout } from '@/components/dashboard-layout'
import QueryProvider from './QueryProvider'

export const metadata:Metadata = {
  title: 'Muslim Guide',
  description: 'Your daily companion for Islamic practices, prayer times, Qibla direction, and authentic Hadiths.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProvider>
    <html lang="en">
      <body>
       {children}
        </body>
    </html>
    </QueryProvider>
  )
}
