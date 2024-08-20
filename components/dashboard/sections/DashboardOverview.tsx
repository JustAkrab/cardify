"use client"

import { useState, useEffect } from 'react';
import {createClient} from "@/utils/supabase/client";
import Link from "next/link";
import {classNames} from "@/lib/utils";
import {ArrowDownIcon, ArrowUpIcon} from "lucide-react";

interface FlashCard {
    id: string;
    question: string;
    created_at: string;
}

interface StatItem {
    name: string;
    stat: string;
    previousStat: string;
    change: string;
    changeType: 'increase' | 'decrease';
}

export function DashboardOverview() {
    const [flashCardsCount, setFlashCardsCount] = useState<number | null>(null);
    const [decksCount, setDecksCount] = useState<number | null>(null);
    const [stats, setStats] = useState<StatItem[]>([]);
    const [recentFlashCards, setRecentFlashCards] = useState<FlashCard[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: flashCards, count: flashCardsCount } = await createClient()
                    .from('flashcards')
                    .select('*', { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .limit(5);

                const { data: decks, count: decksCount } = await createClient()
                    .from('decks')
                    .select('*', { count: 'exact' });

                setFlashCardsCount(flashCardsCount ?? 0);
                setDecksCount(decksCount ?? 0);
                setRecentFlashCards(flashCards ?? []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
                    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                        {stats.map((item) => (
                            <div key={item.name} className="px-4 py-5 sm:p-6">
                                <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                                <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                        {item.stat}
                                        <span
                                            className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
                                    </div>

                                    <div
                                        className={classNames(
                                            item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                            'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                                        )}
                                    >
                                        {item.changeType === 'increase' ? (
                                            <ArrowUpIcon
                                                aria-hidden="true"
                                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                aria-hidden="true"
                                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                            />
                                        )}

                                        <span
                                            className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                        {item.change}
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <h2 className="mt-10 text-xl font-semibold">Recently Added Flash Cards</h2>
                <ul className="mt-4 space-y-2">
                    {recentFlashCards.length > 0 ? (
                        recentFlashCards.map((card) => (
                            <li key={card.id} className="text-gray-700">
                                {card.question}
                            </li>
                        ))
                    ) : (
                        <li>No flash cards found.</li>
                    )}
                </ul>

                <div className="mt-6 flex space-x-4">
                    <Link href={'/dashboard/create'}>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Create New Flash Card
                        </button>
                    </Link>
                    <Link href={'/dashboard/review'}>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Review Decks
                        </button>
                    </Link>
                </div>
    </>
    );
}
