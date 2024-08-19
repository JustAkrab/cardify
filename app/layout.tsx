import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Cardify',
	description: 'Cardify is an AI flashcards creator that will help you study, memorize, and learn faster.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html className="h-full bg-white" lang="en">
			<body className={`${inter.className} h-full`}>
				{children}
			</body>
		</html>
	);
}
