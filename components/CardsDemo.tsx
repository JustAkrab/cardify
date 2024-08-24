"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know Cardify.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "AI-Powered Flashcards",
    title: "Generate Flashcards with AI",
    src: "https://images.unsplash.com/photo-1639004643579-7286ae5a771d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "An AI icon with gears and a brain, symbolizing the automated generation of flashcards from various inputs like PDFs and videos.",
  },
  {
    category: "Import",
    title: "Import Flashcards from PDF using AI",
    src: "https://images.unsplash.com/photo-1604882737321-e6937fd6f519?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "A document being scanned or converted on a computer screen, representing the ability to import flashcards from PDFs.",
  },
  {
    category: "Text Input",
    title: "Use AI to Create Flashcards from Text",
    src: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "A text editor on a computer screen, with text being converted into flashcards, symbolizing the feature to create flashcards directly from text input.",
  },
  // flashcards from Youtube video
  {
    category: "Video Input",
    title: "Create Flashcards from YouTube Videos",
    src: "https://images.unsplash.com/photo-1551817958-11e0f7bbea9c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "A YouTube video being played on a computer screen, with the video content being converted into flashcards, representing the feature to create flashcards from video input.",
  },
  {
    category: "Manual Creation",
    title: "Create Flashcards Manually",
    src: "/fs.jpg",
    content:
      "A clean desk with stationery like index cards, pens, and sticky notes, indicating the manual creation of flashcards.",
  },
  {
    category: "Organize",
    title: "Organize Flashcards into Folders",
    src: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "A set of neatly organized folders on a desktop, with labels for different subjects or topics, representing the organization of flashcards into folders.",
  },
  {
    category: "Review",
    title: "Review Your Flashcards",
    src: "https://images.unsplash.com/photo-1593698054469-2bb6fdf4b512?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "An open flashcard app on a tablet, with a person reviewing cards, symbolizing the ease of reviewing flashcards anytime, anywhere.",
  },
];
