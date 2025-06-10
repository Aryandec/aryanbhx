import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aryanbhx Portfolio",
  description: "A portfolio showcasing my projects and skills.",
  openGraph: {
    title: "Aryanbhx Portfolio",
    description: "A portfolio showcasing my projects and skills.",
    url: "https://aryanbhx.vercel.app/",
    siteName: "Aryanbhx Portfolio",
    images: [
      {
        url: "https://aryanbhx.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aryanbhx Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
