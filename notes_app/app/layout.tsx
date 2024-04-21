import SideBar from "@/components/SideBar"
import "./globals.css";
import React from "react";
import { Open_Sans } from "next/font/google";
import { AuthProvider } from "../components/AuthContext";

export const metadata = {
  title: 'Note',
  description: 'This is simplisitic Note App',
}
const font =   Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
            {children}
         </AuthProvider>
        </body>
    </html>
  )
}
