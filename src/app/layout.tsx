import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "INBLACKM — ติดตามออเดอร์เติมเกม", description: "ตรวจสอบสถานะออเดอร์เติมเกม ค้นหาด้วยหมายเลขออเดอร์หรือชื่อเกม", robots: {index:false, follow:false} };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="th"><body>{children}</body></html>; }
