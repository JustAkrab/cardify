import { createClient } from '@/utils/supabase/server';
import ReviewClient from './ReviewClient';

const Review = async () => {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (!user) {
		return null;
	}

	// fetch initial decks
	const { data: initialDecks, error: deckError } = await supabase
		.from('decks')
		.select('*')
		.eq('user_id', user.id!)
		.order('created_at', { ascending: false });

	return <ReviewClient user={user} initialDecks={initialDecks!} />;
};

export default Review;
