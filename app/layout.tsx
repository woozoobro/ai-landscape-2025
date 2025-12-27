import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const paperlogy = localFont({
  src: [
    { path: "./fonts/Paperlogy-1Thin.woff2", weight: "100" },
    { path: "./fonts/Paperlogy-2ExtraLight.woff2", weight: "200" },
    { path: "./fonts/Paperlogy-3Light.woff2", weight: "300" },
    { path: "./fonts/Paperlogy-4Regular.woff2", weight: "400" },
    { path: "./fonts/Paperlogy-5Medium.woff2", weight: "500" },
    { path: "./fonts/Paperlogy-6SemiBold.woff2", weight: "600" },
    { path: "./fonts/Paperlogy-7Bold.woff2", weight: "700" },
    { path: "./fonts/Paperlogy-8ExtraBold.woff2", weight: "800" },
    { path: "./fonts/Paperlogy-9Black.woff2", weight: "900" },
  ],
  variable: "--font-paperlogy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Landscape 2025",
  description: "2025년 생성형 AI 트렌드를 3D 인터랙티브 타임라인으로 시각화",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${paperlogy.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
