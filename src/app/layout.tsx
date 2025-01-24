import type { Metadata } from "next";
import localFont from 'next/font/local'
import GsapProvider from '@/components/GsapProvider';
import "./globals.css";
import { ErrorProvider } from "@/context/ErrorContext";

export const metadata: Metadata = {
  title: "John Lexter Laguinday | Cinematographer",
  description: "A Cinematographer based in Manila, PH",
};

const neueMontreal = localFont({
  display: 'swap',
  variable: '--font1',
  src: [
    {
      path: './fonts/PPNeueMontreal-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-Book.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-Bold.woff2',
      weight: '800',
      style: 'normal',
    }
  ],
})

const offBit = localFont({
  display: 'swap',
  variable: '--font2',
  src: [
    {
      path: './fonts/OffBit-Bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/OffBit-Regular.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorProvider>
          <GsapProvider>
            {children}
          </GsapProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
