'use client';
import "./globals.scss";
import '@mantine/core/styles.css';
import { Navbar } from "./components/NavBar/NabBar";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme";
import Providers from '@/store/Provider';
import { ModalEstimate } from "./components/ModalEstimate/ModalEstimate";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>My awesome app</title>

        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Providers>
            <Navbar />
            <ModalEstimate />
            <main>
              {children}
            </main>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}

// export default wrapper.withRedux(RootLayout);
