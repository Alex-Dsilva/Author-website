import './globals.css'
export const metadata = {
  title: 'Art of Mind | Deborah M Tungnung',
  description: 'Official website for Art of Mind by Deborah M Tungnung.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
