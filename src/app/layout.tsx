import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Poppins } from "next/font/google";
import { TopNav } from "./_components/nav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";

const poppins = Poppins({
  weight: ["400", "300", "200", "600", "500", "100", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "natan`s random app",
  description: "upload images and shit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body className={` ${poppins.className} dark `}>
            <div className="grid  grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll scroll-smooth">
                {children}
              </main>
              {modal}
            </div>
            <div id="modal-root" />
            <Toaster theme={"dark"} />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
