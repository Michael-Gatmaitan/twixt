import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./index.css";
import ReduxProvider from "@/lib/ReduxProvider";
import Nav from "./components/Nav";
import LogoutModal from "./components/modals/Logout/LogoutModal";
import HooksComponent from "@/lib/HooksComponent";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Sidebar from "@/app/components/Sidebar";
import { verifySession } from "@/lib/dal";

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["400", "600", "500", "700", "800"],
//   variable: "--font-inter",
// });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],

  variable: "--font-montserrat",
});

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sourcesanspro",
});

export const metadata: Metadata = {
  title: "Twixt | Michael Gatmaitan",
  description: "Social media project to practice my database skills",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();

  // if (!user?._id) {
  //   alert("user has not session");
  // }

  const session = await verifySession();

  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${sourceSansPro.variable}`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HooksComponent>
              <Nav />
              <LogoutModal />

              <main className="container lg:flex lg:justify-between lg:h-screen">
                {session.isAuth ? <Sidebar /> : null}
                {/* <Sidebar /> */}
                {children}
              </main>
            </HooksComponent>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

// export const revalidate = 0;

