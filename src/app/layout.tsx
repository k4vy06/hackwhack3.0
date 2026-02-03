import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hack Whack 3.0 | Innovate • Build • Compete",
    description: "24 Hour College Hackathon organized by CSE Department & Forum Suigeneris. QR Based Entry, Real-time Tracking, and Team Registration.",
    keywords: ["hackathon", "coding", "competition", "college", "CSE", "technology"],
    authors: [{ name: "Forum Suigeneris" }],
    openGraph: {
        title: "Hack Whack 3.0",
        description: "24 Hour College Hackathon - Innovate • Build • Compete",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
