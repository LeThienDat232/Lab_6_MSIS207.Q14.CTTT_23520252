import type { AppProps } from "next/app";
import { Source_Sans_3 } from "next/font/google";
import "../app/globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sourceSans.variable} antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}
