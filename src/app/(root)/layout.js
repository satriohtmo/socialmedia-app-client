import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/Shared/Topbar";
import Leftsidebar from "@/components/Shared/Leftsidebar";
import Rightsidebar from "@/components/Shared/Rightsidebar";
import Bottombar from "@/components/Shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Captiverse",
  description: "Share your universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />
        <main className="flex flex-row">
          <Leftsidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <Rightsidebar />
        </main>
        <Bottombar />
      </body>
    </html>
  );
}
