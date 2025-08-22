import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gerador de Cenários Jurídicos | Treinamento com IA',
  description:
    'Ferramenta para gerar cenários jurídicos realistas para treinamento de equipes usando Inteligência Artificial',
  keywords: 'jurídico, treinamento, IA, cenários, advocacia, negociação',
  authors: [{ name: 'Equipe Jurídica' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">📚 Cenários Jurídicos IA</h1>
                </div>
                <div className="text-sm text-gray-500">Sexta Criativa - Treinamento Jurídico</div>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                © 2024 Gerador de Cenários Jurídicos. Desenvolvido para treinamento e
                aperfeiçoamento profissional.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
