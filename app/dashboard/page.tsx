import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

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

export default async function DashboardOverview() {
	const supabase = createClient();
	// get user
	const {
		data: { user },
		error: uError,
	} = await supabase.auth.getUser();

	if (uError) {
		console.error(uError);
		return;
	}
	const { data: decks, count: decksCount } = await supabase
		.from('decks')
		.select('*', { count: 'exact' })
		.eq('user_id', user?.id)
		.order('created_at', { ascending: false })
		.limit(5);

	return (
		<>
			<div>
				<dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
					{/* {stats &&stats.map((item) => (
						<>
							<h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
							<div key={item.name} className="px-4 py-5 sm:p-6">
								<dt className="text-base font-normal text-gray-900">{item.name}</dt>
								<dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
									<div className="flex items-baseline text-2xl font-semibold text-indigo-600">
										{item.stat}
										<span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
									</div>

									<div
										className={classNames(
											item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
											'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
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

										<span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
										{item.change}
									</div>
								</dd>
							</div>
						</>
					))} */}
				</dl>
			</div>

			<h2 className="mt-10 text-xl font-semibold">Recently Added Decks</h2>
			<ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{decks && decks.length > 0 ? (
					decks.map((card) => (
						<li key={card.id}>
							<Link
								href={`/dashboard/review/${card.id}`}
								className="w-full bg-white rounded-lg p-5 aspect-video fc items-start border-2 border-neutral-200 transition-colors hover:bg-neutral-200 hover:border-indigo-600"
							>
								<h3 className="text-lg font-bold">{card.name}</h3>
								<p className="text-sm">{card.description}</p>
							</Link>
						</li>
					))
				) : (
					<li>No flash cards found.</li>
				)}
			</ul>

			<div className="mt-6 flex space-x-4">
				<Link href={'/dashboard/create'}>
					<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
						Create New Flash Card
					</button>
				</Link>
				<Link href={'/dashboard/review'}>
					<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
						Review Decks
					</button>
				</Link>
			</div>
		</>
	);
}
