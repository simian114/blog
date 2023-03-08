import { ReactNode } from "react"
import "@styles/globals.scss"

export const metadata = {
  title: `RocketMan's blog!`,
  description: `Hello workd, it's me!`,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="dark-theme">
        {/* nav */}
        <nav className="navigation">navigation</nav>
        {children}
        <footer className="footer">footer</footer>
        {/* Footer */}
      </body>
    </html>
  )
}
