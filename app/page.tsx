'use client';
import { TextEffect } from '@/components/core/text-effect';
import React from 'react';
import { motion } from 'framer-motion';
import { Subscribe } from '@/components/EmailButton';
import Image from 'next/image';
import {ThemeProvider} from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import {Toaster} from "sonner";

const Home = () => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
			<Navbar />
			<Toaster position="bottom-center" richColors />
			<div className="w-full h-screen overflow-hidden fc justify-between pt-36 bg-background text-foreground px-5 sm:px-10 gap-24">
				<div className="max-w-6xl w-full fc justify-start h-full">
					<TextEffect
						className="relative z-10 text-4xl md:text-7xl tracking-tight text-center text-orange-500 font-sans font-bold mb-2"
						per="word"
						as="h3"
						preset="blur"
					>
						Unlock your potential with Cardify
					</TextEffect>
					<motion.p
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="text-center text-sm md:text-2xl mb-10"
					>
						There is an easier way to <b>study, memorize, and learn faster</b>. <br className="hidden sm:block" /> Cardify is a cutting edge
						flashcards creator that will help you achieve your goals.
					</motion.p>

					<p className="text-center text-sm md:text-2xl mb-4">Join our waitlist!</p>
					<Subscribe />
				</div>
				<Image src="/landing.png" alt="Phone graphic" width={900} height={600} className="w-full h-auto max-w-6xl" />
			</div>
		</ThemeProvider>
	);
};

export default Home;
