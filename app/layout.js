import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CareerCraft – AI-Powered Career Growth",
  description:
    "CareerCraft helps you accelerate your career with AI-powered insights, personalized interview preparation, and professional guidance.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "CareerCraft – AI-Powered Career Growth",
    description:
      "Unlock your full career potential with AI-powered tools designed for professionals.",
    url: "https://careercraft.com",
    siteName: "CareerCraft",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CareerCraft Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${inter.className} bg-gradient-to-b from-gray-950 via-gray-900 to-black text-foreground antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="min-h-screen">{children}</main>

            {/* Toaster */}
            <Toaster richColors />

            {/* Footer */}
            <footer className="relative border-t border-primary/30 bg-background/80 backdrop-blur py-8">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>
                  Made with <span className="text-pink-500">💗</span> by{" "}
                  <span className="font-semibold text-primary hover:underline">
                    Rishu
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground/80">
                  © {new Date().getFullYear()} CareerCraft. All rights reserved.
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-400"></div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
