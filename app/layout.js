import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'SafeCheck — Food Label Allergen Analyzer',
  description: 'Scan food labels to instantly check for gluten, lactose, peanut, and soy allergens. Built for people with celiac disease and food sensitivities.',
  keywords: 'celiac, gluten free, food allergy, lactose intolerance, peanut allergy, food label scanner',
  openGraph: {
    title: 'SafeCheck — Food Label Allergen Analyzer',
    description: 'Scan food labels to instantly check for gluten, lactose, peanut, and soy allergens.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <div className="header-inner">
            <a href="/" className="header-logo">
              <div className="header-logo-icon">🛡</div>
              SafeCheck
            </a>
            <span className="header-badge">Free &amp; Private</span>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} SafeCheck · Not a substitute for medical advice
        </footer>
      </body>
    </html>
  );
}
