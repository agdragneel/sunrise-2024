import { AppProps } from 'next/app';
import { ThemeProviderComponent } from '@/context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProviderComponent>
      <Component {...pageProps} />
    </ThemeProviderComponent>
  );
}
