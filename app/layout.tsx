import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "@/components/providers"

const montserrat = localFont({
  src: [
    {
      path: '../public/assets/fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Montserrat-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Montserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "Тарифы",
  description: "Выбери подходящий для себя тариф",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`h-full antialiased ${montserrat.variable}`}
    >
      <body className="min-h-full flex flex-col font-montserrat">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
