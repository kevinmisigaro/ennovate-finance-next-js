import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/utils/store/UserContext";
import { ProjectProvider } from "@/utils/store/ProjectContext";
import { SingleProjectProvider } from "@/utils/store/SingleProjectContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ennovate Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ProjectProvider>
            <SingleProjectProvider>{children}</SingleProjectProvider>
          </ProjectProvider>
        </UserProvider>
      </body>
    </html>
  );
}
