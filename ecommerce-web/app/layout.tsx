import type { ReactNode } from 'react';
import { AuthProvider } from '../lib/providers/auth-provider';
import './globals.css';

export const metadata = {
  title: 'Fashion Commerce',
  description: 'Modern fashion ecommerce experience',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
