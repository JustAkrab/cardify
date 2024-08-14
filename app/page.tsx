'use client';
import CheckoutButton from '@/components/CheckoutButton';
import { TextEffect } from '@/components/core/text-effect';
import React from 'react';
import { motion } from 'framer-motion';
import { EmailButton, Subscribe } from '@/components/EmailButton';
import Image from 'next/image';

const Home = () => {
    return (
        <div className="w-full h-screen overflow-hidden justify-between fc py-16 bg-background text-foreground px-5 sm:px-10">
            <div className="max-w-6xl w-full fc justify-start">
                <TextEffect
                    className="relative z-10 text-lg md:text-7xl tracking-tight text-center font-sans font-bold mb-5"
                    per="word"
                    as="h3"
                    preset="blur"
                >
                    Unlock your potential with Cardify
                </TextEffect>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, y: 0 }}
                    className="text-center text-sm md:text-2xl mb-10"
                >
                    There is an easier way to <b>study, memorize, and learn faster</b>. <br /> Cardify is a cutting edge flashcards creator that will
                    help you achieve your goals.
                    {/* <CheckoutButton /> */}
                </motion.p>
                {/* add waitlist form here, Please use shadcn components */}
                <Subscribe />
            </div>
            {/* add phone graphic or such */}
            <div className="mt-2 flex justify-center">
                <Image
                    src="/image1.jpg"
                    alt="Phone graphic"
                    width={900}
                    height={900}
                />
            </div>
        </div>
    );
};


export default Home;
