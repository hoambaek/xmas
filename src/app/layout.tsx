import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "별을 따라서 - 장덕동성당 중고등부 성탄절 공연",
  description: "장덕동성당 중고등부 성탄절 공연 기획 - 세 아이가 별을 따라 떠나는 그림자극 '별을 따라서 (Following the Star)'",
  keywords: "장덕동성당, 중고등부, 성탄절 공연, 그림자극, 별을 따라서, 크리스마스, 뮤지컬",
  authors: [{ name: "장덕동성당 중고등부" }],
  openGraph: {
    title: "별을 따라서 - 장덕동성당 중고등부 성탄절 공연",
    description: "세 아이가 별을 따라 떠나는 감동적인 그림자극",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
