import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

const Review = async () => {
	// fetch all flashcards
	const supabase = createClient();

	const { data, error } = await supabase.from('decks').select('*').order('created_at', { ascending: false });

	return (
		<div className="w-full">
			<h2 className="text-3xl font-bold fr gap-2 justify-start">Review</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 items-stretch">
				{data &&
					data.map((deck, index) => (
						<Link
							href={`/dashboard/review/${deck.id}`}
							key={index}
							className="bg-white rounded-lg p-5 items-start h-auto fc justify-between border-2 border-neutral-200 transition-colors hover:bg-neutral-200 hover:border-indigo-600"
						>
							<div className="fc justify-start items-start">
								<h3 className="text-lg font-bold">{deck.name}</h3>
								{/* only allow 20 characters in desc */}
								<p className="text-sm">
									{deck?.description && deck?.description?.length > 100
										? deck.description?.slice(0, 100) + '...'
										: deck.description}
								</p>
							</div>
							<p className="text-xs text-neutral-500 mt-4">
								Created at{' '}
								{new Date(deck.created_at!).toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
								})}{' '}
								on {new Date(deck.created_at!).toDateString()}
							</p>
						</Link>
					))}
			</div>
		</div>
	);
};
export default Review;
