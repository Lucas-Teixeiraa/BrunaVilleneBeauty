import '@/app/globals.css'; // Importa os estilos globais
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  // Configura o basePath para o GitHub Pages (produção) ou local (desenvolvimento)
  const basePath = process.env.NODE_ENV === 'production' ? '/BrunaVilleneBeauty' : '';
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}