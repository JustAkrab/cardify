"use client";
import { TextEffect } from "@/components/core/text-effect";
import React from "react";
import { motion } from "framer-motion";
import { Subscribe } from "@/components/EmailButton";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { Carousel } from "@/components/cards-carousel";
import { AppleCardsCarouselDemo } from "@/components/CardsDemo";
import { Pricing } from "@/components/ui/pricing";

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};
// dummy data for features
const cards = [
  {
    title: "Create Flashcards",
    category: "Study",
    src: "/images/flashcards.svg",
    content: (
      <p>
        Create your own flashcards or use our pre-made templates to get started
        quickly.
      </p>
    ),
  },
  {
    title: "Study Efficiently",
    category: "Study",
    src: "/images/study.svg",
    content: (
      <p>
        Study your flashcards using our spaced repetition algorithm to maximize
        your learning.
      </p>
    ),
  },
  {
    title: "Share with Friends",
    category: "Study",
    src: "/images/share.svg",
    content: (
      <p>
        Share your flashcards with friends or classmates to study together and
        learn faster.
      </p>
    ),
  },
  {
    title: "Learn Faster",
    category: "Study",
    src: "/images/learn.svg",
    content: (
      <p>
        Learn faster and retain more information with our cutting edge
        flashcards creator.
      </p>
    ),
  },
];

const Home = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <Toaster position="bottom-center" richColors />
      <div className="w-full min-h-screen overflow-hidden fc justify-between pt-36 bg-background text-foreground px-5 sm:px-10 gap-24">
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
            There is an easier way to <b>study, memorize, and learn faster</b>.{" "}
            <br className="hidden sm:block" /> Cardify is a cutting edge
            flashcards creator that will help you achieve your goals.
          </motion.p>

          <p className="text-center text-sm md:text-2xl mb-4">
            Join our waitlist!
          </p>
          <Subscribe />
        </div>
        <AppleCardsCarouselDemo />
        <Pricing />
      </div>
    </ThemeProvider>
  );
};

export default Home;
