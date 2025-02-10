"use client";

import { AuthProvider, useAuth } from '../../contexts/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
