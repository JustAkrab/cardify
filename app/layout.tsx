import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Cardify',
	description: 'Cardify is an AI flashcards creator that will help you study, memorize, and learn faster.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
					<Navbar />
					<Toaster position="bottom-center" richColors />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
