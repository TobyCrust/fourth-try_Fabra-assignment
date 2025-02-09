import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'Shirt Designer',
  description: '3D Shirt Designer with Authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
