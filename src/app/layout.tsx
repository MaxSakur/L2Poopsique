import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Image from "next/image";
import bgImage from "@/assets/bg.jpg";
import styles from "./page.module.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L2 Poopsique App",
  description: "Web app to perform gameplay for the players.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.container}`}>
        <Image
          className={styles.bg}
          src={bgImage}
          fill={true}
          quality={100}
          alt="background"
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
