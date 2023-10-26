import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

export const metadata = {
  title: "Galaxy",
  description: "Next.js Meta Galaxy Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} bg-dark-2`}>{children}</body>
    </html>
    // </ClerkProvider>
  );
}
