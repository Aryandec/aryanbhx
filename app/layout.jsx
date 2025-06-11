import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
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
        className={`${cormorantGaramond.variable} ${poppins.variable} antialiased `}
      >
        <Navbar />
        <main className="flex-grow">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
