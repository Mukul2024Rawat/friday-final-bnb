import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { AuthProvider } from "../contexts/AuthContext";
import dynamic from "next/dynamic";
import { GlobalModalProvider } from "@/contexts/GlobalModalContext";
import { Toaster as ToasterShad } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

const ClientSideLayout = dynamic(() => import("@/components/ClientSideLayout"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Airnb - Your Home Away From Home",
  description: "Discover and book unique accommodations around the world with Airnb.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <GlobalModalProvider>
              <ClientSideLayout>
                <Toaster
                  toastOptions={{
                    className: "toast",
                    duration: 5000,
                  }}
                  position="top-center"
                />
                {children}
                <ToasterShad />
              </ClientSideLayout>
            </GlobalModalProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
