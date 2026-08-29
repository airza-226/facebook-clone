import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import { AuthProvider } from "@/Context/AuthContext";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap", 
});

export const viewport: Viewport = {
  themeColor: "#18191a",
  width: "device-width",
  initialScale: 1,
};


export const metadata: Metadata = {
  title: "Social Vibe Airza-226",
  description: "A social media platform",
  icons: {
    icon: "/icon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`
          ${poppins.className}
          min-h-screen flex flex-col
          bg-[#18191a]
          text-gray-100
          overflow-x-hidden
        `}
      >
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
            focus:px-4 focus:py-2
            focus:bg-[#1877f2] focus:text-white
            focus:rounded-lg focus:font-semibold focus:text-sm
            focus:shadow-lg
          "
        >
          Skip to main content
        </a>
        <QueryProvider>
          <AuthProvider>
            <Navbar />

            <main id="main-content" className="flex-1 bg-[#18191a] pt-14">
              {children}
            </main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}