'use client';
import { Sparkles } from 'lucide-react';
import { flashcardsFromYoutube } from '../../actions';
import { FlashcardDeck, FlashcardResponse } from '../../types';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import Flashcards from '@/components/flashcards/flashcards';
import Image from 'next/image';
const Youtube = () => {
	const [generatedDeck, setGeneratedDeck] = useState<FlashcardDeck | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const text = formData.get('text') as string;
		const promise = new Promise(async (resolve, reject) => {
			const generated: FlashcardDeck = await flashcardsFromYoutube(text);
			if (generated) {
				resolve('Generated!');
			} else {
				reject('Failed to generate');
			}
			setGeneratedDeck(generated);
		});

		toast.promise(promise, {
			loading: 'Generating...',
			success: 'Generated!',
			error: 'Failed to generate',
		});
	};
	return (
		<div className="w-full">
			<div className="text-3xl font-bold fr gap-2 justify-start">
				<Image src="/youtube.svg" width={30} height={30} alt="Youtube Icon" />
				<h2>Generate from YouTube</h2>
			</div>
			<form className="fr items-start mt-10 max-w-md gap-2" onSubmit={handleSubmit}>
				<input
					type="url"
					name="text"
					required
					placeholder="Enter Youtube URL"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Generate
				</button>
			</form>
			<Flashcards deck={generatedDeck} />
		</div>
	);
};
export default Youtube;
