'use client';

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
    Bars3Icon,
    CalendarIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {ElementType, useState} from 'react';
import { classNames } from '@/lib/utils';
import {DocumentTextIcon} from "@heroicons/react/16/solid";
import {ClipboardListIcon, CogIcon} from "lucide-react";
import Link from "next/link";

interface INavigation {
    name: string,
    section: string, // Updated to section for dynamic rendering
    icon: ElementType,
    current: boolean
}

const navigation: INavigation[] = [
    { name: 'Home', section: 'dashboard', icon: HomeIcon, current: true },
    { name: 'Create Flash Cards', section: 'create', icon: DocumentTextIcon, current: false },
    { name: 'Manage Flash Cards', section: 'manage', icon: ClipboardListIcon, current: false },
    { name: 'Review Flash Cards', section: 'review', icon: CalendarIcon, current: false },
    { name: 'Subscription', section: 'subscription', icon: UsersIcon, current: false },
    { name: 'Profile', section: 'profile', icon: CogIcon, current: false },
];

interface SidebarProps {
    onSelect: (section: string) => void; // Pass selected section to parent component
}

export function Sidebar({ onSelect }: SidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSectionClick = (section: string) => {
        onSelect(section);
        setSidebarOpen(false);
    };

    return (
        <>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                            <div className="flex h-16 shrink-0 items-center">
                                <img alt="Cardify" src="https://tailwindui.com/img/logos/mark.svg?color=white" className="h-8 w-auto" />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <button
                                                        onClick={() => handleSectionClick(item.section)}
                                                        className={classNames(
                                                            item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                        )}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                                'h-6 w-6 shrink-0',
                                                            )}
                                                        />
                                                        {item.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <img alt="Cardify" src="https://tailwindui.com/img/logos/mark.svg?color=white" className="h-8 w-auto" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => handleSectionClick(item.section)}
                                                className={classNames(
                                                    item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                        'h-6 w-6 shrink-0',
                                                    )}
                                                />
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="-mx-6 mt-auto">
                                <Link
                                    href="#"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
                                >
                                    <img
                                        alt="Cardify"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full bg-indigo-700"
                                    />
                                    <span className="sr-only">Your profile</span>
                                    <span aria-hidden="true">Tom Cook</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Sidebar toggle button for mobile */}
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-indigo-200 lg:hidden">
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
                <Link href="#">
                    <span className="sr-only">Your profile</span>
                    <img
                        alt="Cardify"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full bg-indigo-700"
                    />
                </Link>
            </div>
        </>
    );
}
