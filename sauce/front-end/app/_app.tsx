import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../Routes/Routes';

function MyApp({ Component, pageProps }: AppProps) {
  // Only render BrowserRouter on client side
  if (typeof window === 'undefined') return null;

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default MyApp;
