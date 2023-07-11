'use client';

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JuMailer',
  description: 'envie vários emails de uma vez',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
