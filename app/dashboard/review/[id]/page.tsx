'use client';
import Flashcards from '@/components/flashcards/flashcards';
import { useEffect, useState } from 'react';
import { FlashcardDeck } from '../../types';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/database.types';
import { FlashcardArray } from 'react-quizlet-flashcard';
import ReactMarkdown from 'react-markdown';

const Review = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [deck, setDeck] = useState<Tables<'decks'> | null>(null);
	const [flashcards, setFlashcards] = useState<Tables<'flashcards'>[] | null>(null);

	const [loading, setLoading] = useState(true);
	const supabase = createClient();
	useEffect(() => {
		const fetchDeck = async () => {
			const { data, error } = await supabase.from('decks').select('*').eq('id', id).single();
			if (error || !data) {
				console.error(error);
				toast.error('Failed to get deck');
				return;
			}

			// fetch flashcards
			const { data: sFlashcards, error: fError } = await supabase.from('flashcards').select('*').eq('deck_id', id);

			if (fError || !sFlashcards) {
				console.error(fError);
				toast.error('Failed to get flashcards');
				return;
			}

			// transform to FlashcardsResponse
			const newCards = sFlashcards.map((card) => {
				return {
					id: card.id,
					frontHTML: <ReactMarkdown className="w-full h-full fc p-5">{card.question}</ReactMarkdown>,
					backHTML: <ReactMarkdown className="w-full h-full fc p-5">{card.answer}</ReactMarkdown>,
				};
			});

			setFlashcards(newCards);
			setDeck(data);
			setLoading(false);
		};
		fetchDeck();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full">
			<div className="fc items-start gap-2 mb-10">
				<h2 className="text-3xl font-bold fr gap-2 justify-start">{deck?.name}</h2>
				<p>{deck?.description}</p>
			</div>

			{deck && flashcards && <FlashcardArray cards={flashcards} />}
		</div>
	);
};

export default Review;
