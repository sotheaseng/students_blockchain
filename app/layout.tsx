import type React from "react"
import type { Metadata } from "next"
import Layout from "@/components/Layout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Student Blockchain Management",
  description: "Secure, immutable student record management with blockchain technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
