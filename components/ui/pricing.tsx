'use client';
import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/lib/utils';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const tiers = [
	{
		name: 'Free',
		id: 'tier-hobby',
		href: '#',
		priceMonthly: '$0',
		description: 'Basic features for getting started.',
		features: ['Manual flashcards', 'Unlimited Decks', 'Unlimited Cards', 'Basic analytics'],
		mostPopular: false,
	},
	{
		name: 'Pro',
		id: 'tier-growth',
		href: '#',
		priceMonthly: '$1',
		description: 'All the features you need to seamlessly create your flashcards.',
		features: [
			'All free features',
			'Creation of flashcards from text with AI',
			'Creation of flashcards from PDFs with AI',
			'Creation of flashcards from YouTube videos with AI',
			'Advanced analytics',
			'Priority support',
		],
		mostPopular: true,
	},
];

export function Pricing() {
	const [priceIdLoading, setPriceIdLoading] = useState<string>();
	const supabase = createClient();
	const router = useRouter();
	const handleStripeCheckout = async (price) => {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		setPriceIdLoading(price.id);

		if (!user) {
			setPriceIdLoading(undefined);
			return router.push('/signin/signup');
		}

		const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath);

		if (errorRedirect) {
			setPriceIdLoading(undefined);
			return router.push(errorRedirect);
		}

		if (!sessionId) {
			setPriceIdLoading(undefined);
			return router.push(
				getErrorRedirect(currentPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.')
			);
		}

		const stripe = await getStripe();
		stripe?.redirectToCheckout({ sessionId });

		setPriceIdLoading(undefined);
	};
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pricing Plans for Everyone</p>
				</div>
				<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
					Start with our free plan, or get all the features starting at $1 per month.
				</p>
				<div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
					{tiers.map((tier, tierIdx) => (
						<div
							key={tier.id}
							className={classNames(
								tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
								tierIdx === 0 ? 'lg:rounded-r-none' : '',
								tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
								'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
							)}
						>
							<div>
								<div className="flex items-center justify-between gap-x-4">
									<h3
										id={tier.id}
										className={classNames(
											tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
											'text-lg font-semibold leading-8'
										)}
									>
										{tier.name}
									</h3>
									{tier.mostPopular ? (
										<p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
											Most popular
										</p>
									) : null}
								</div>
								<p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
								<p className="mt-6 flex items-baseline gap-x-1">
									<span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
									<span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
								</p>
								<ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
									{tier.features.map((feature) => (
										<li key={feature} className="flex gap-x-3">
											<CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
											{feature}
										</li>
									))}
								</ul>
							</div>
							<a
								href={tier.href}
								aria-describedby={tier.id}
								className={classNames(
									tier.mostPopular
										? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
										: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
									'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								)}
							>
								Get Started
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
