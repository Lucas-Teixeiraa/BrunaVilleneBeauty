import { Metadata } from 'next';
import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: 'Bruna Villene | Natural Beauty Laser',
  description: 'Expert em Tecnologias, Reconstrução e Micropigmentação',
  icons: {
    icon: '/logo_page.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
