import "./globals.css";
import { Poppins } from 'next/font/google';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ReduxProvider from "./redux/Provider";
import { Toaster } from 'react-hot-toast';



const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],   
  display: 'swap',       
});
config.autoAddCss = false;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
           {children}
           <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
