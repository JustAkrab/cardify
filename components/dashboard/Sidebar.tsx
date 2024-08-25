'use client';
// src/components/Dashboard/Sidebar.tsx
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, HomeIcon, DocumentTextIcon, CalendarIcon, UsersIcon, CogIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ClipboardListIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { logout } from '@/app/login/actions';
import Image from 'next/image';

const navigation = [
	{ name: 'Dashboard', section: '/', icon: HomeIcon },
	{ name: 'Create Flash Cards', section: '/create', icon: DocumentTextIcon },
	{ name: 'Manage Flash Cards', section: '/manage', icon: ClipboardListIcon },
	{ name: 'Review Flash Cards', section: '/review', icon: CalendarIcon },
	{ name: 'Subscription', section: '/subscription', icon: UsersIcon },
	{ name: 'Profile', section: '/profile', icon: CogIcon },
];

export function Sidebar({ user }: { user: User | null }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			<div className="lg:hidden">
				<button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-indigo-200 lg:hidden">
					<Bars3Icon className="h-6 w-6" aria-hidden="true" />
				</button>
			</div>

			{/* Mobile Sidebar */}
			<Dialog as="div" open={sidebarOpen} onClose={setSidebarOpen}>
				<div className="relative z-50 lg:hidden">
					<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					<div className="fixed inset-0 flex z-50">
						<div className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-600">
							<div className="absolute top-0 right-0 p-2">
								<button
									type="button"
									className="inline-flex items-center justify-center rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
									onClick={() => setSidebarOpen(false)}
								>
									<XMarkIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
							<nav className="mt-5 flex-1 h-0 overflow-y-auto">
								<ul className="space-y-1 px-2">
									{navigation.map((item) => (
										<li key={item.name}>
											<Link
												className="group flex items-center px-2 py-2 text-base
                      leading-5 font-medium rounded-md text-white
                      hover:bg-indigo-700 hover:text-white w-full"
												href={`/dashboard${item.section}`}
											>
												<item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</Dialog>

			{/* Desktop Sidebar */}
			<div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-indigo-600">
				<nav className="flex-1 px-2 py-4 overflow-y-auto">
					<ul className="space-y-1">
						{navigation.map((item) => (
							<li key={item.name}>
								<Link
									href={`/dashboard/${item.section}`}
									className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-white hover:bg-indigo-700 hover:text-white"
								>
									<item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="px-3 py-4 fc gap-2">
					<div className="group flex w-full justify-start gap-2 items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-white hover:bg-indigo-700 hover:text-white">
						<Image src={user?.user_metadata.avatar_url} alt="Avatar" width={32} height={32} className="rounded-full" />
						{user?.user_metadata.full_name}
					</div>
					<form action={logout} className="w-full">
						<button
							className="w-full group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-white hover:bg-indigo-700 hover:text-white"
							type="submit"
						>
							<CogIcon className="mr-4 h-6 w-6" aria-hidden="true" />
							Logout
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
