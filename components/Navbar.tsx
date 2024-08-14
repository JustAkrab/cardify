import React from 'react';
import { ModeToggle } from './ThemeButton';
import Link from 'next/link';

const Navbar = () => {
	return (
		<div className="fixed top-0 p-5 w-full fr justify-evenly">
			<h1 className="text-lg font-bold">Cardify</h1>
			<nav className="fr gap-5">
				<Link href="#" className="text-lg font-semibold">
					Home
				</Link>
				<Link href="#" className="text-lg font-semibold">
					Features
				</Link>
				<Link href="#" className="text-lg font-semibold">
					Pricing
				</Link>
				<Link href="#" className="text-lg font-semibold">
					Contact
				</Link>
			</nav>
			<ModeToggle />
		</div>
	);
};

export default Navbar;
