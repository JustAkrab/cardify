'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { FlashcardDeck, FlashcardResponse } from '../../types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import autoAnimate from '@formkit/auto-animate';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface fs {
	question: string;
	answer: string;
	id: string;
}
const Manual = () => {
	const [flashcards, setFlashcards] = useState<fs[]>([]);

	const supabase = createClient();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// description can be empty, title cant be empty, any field, question or answer, in all flashcards cant be empty
		const title = (e.currentTarget.elements[0] as HTMLInputElement).value;
		const description = (e.currentTarget.elements[1] as HTMLInputElement).value;
		console.log(description);
		console.log(title);
		const flashcardEls = Array.from(document.querySelectorAll('.flashcard'));
		if (flashcardEls.length === 0) {
			toast.error('Please add at least one flashcard');
			return;
		}
		const flashcards = flashcardEls.map((fc) => {
			const question = (fc.querySelector('input[name="question"]') as HTMLInputElement).value;
			const answer = (fc.querySelector('input[name="answer"]') as HTMLInputElement).value;
			return { question, answer };
		});
		const valid = flashcards.every((fc) => fc.question && fc.answer);
		if (!title || !valid) {
			toast.error('Please fill all fields');
			return;
		}

		const {
			data: { user },
			error: uError,
		} = await supabase.auth.getUser();

		// send to supabase
		// new deck
		const { data, error: deckInsertError } = await supabase
			.from('decks')
			.insert({
				name: title,
				description,
				user_id: user?.id,
			})
			.select('*');

		if (deckInsertError) {
			toast.error('Error creating deck');
			console.log(deckInsertError);
			return;
		}

		const cards = flashcards.map((card) => {
			return {
				question: card.question,
				answer: card.answer,
				deck_id: data[0].id,
			};
		});

		const { data: cardData, error: cardError } = await supabase.from('flashcards').insert(cards);
		if (cardError) {
			console.log(cardError);
			toast.error('Failed to add cards');
			return;
		}

		toast.success('Deck created!');
		router.push(`/dashboard/review`);
	};

	const router = useRouter();

	const [show, setShow] = useState(false);
	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	return (
		<div className="max-w-6xl w-full">
			<div className="text-3xl font-bold fr gap-2 justify-start">
				<h2>Create Flashcards</h2>
			</div>
			<form onSubmit={handleSubmit} className="mt-10 fc items-start gap-4 ">
				<Input name="title" type="text" className="text-xl font-bold" placeholder="Enter your title" />
				<Textarea placeholder="Enter description" />
				<button
					type="submit"
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap gap-2"
				>
					Create Deck
				</button>{' '}
			</form>
			<div className="mt-10 w-full">
				<h3 className="text-2xl font-bold">Flashcards</h3>
				<div ref={parent} className="mt-4 fc gap-4 w-full">
					{flashcards.map((_, i) => (
						<Flashcard
							index={i}
							key={flashcards[i].id}
							setFlashcard={setFlashcards}
							questionValue={flashcards[i].question}
							answerValue={flashcards[i].answer}
						/>
					))}
				</div>
				<div className="mt-4 w-full fr justify-between">
					<button
						onClick={() =>
							setFlashcards([
								...flashcards,
								{
									question: '',
									answer: '',
									id: crypto.randomUUID(),
								},
							])
						}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap gap-2"
					>
						<PlusIcon className="text-2xl" /> Add Flashcard
					</button>
				</div>
			</div>
		</div>
	);
};

const Flashcard = ({
	index,
	setFlashcard,
	questionValue,
	answerValue,
}: {
	index: number;
	setFlashcard: any;
	questionValue?: string;
	answerValue?: string;
}) => {
	const setQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFlashcard((prev: fs[]) => {
			const newFlashcards = [...prev];
			newFlashcards[index].question = e.target.value;
			return newFlashcards;
		});
	};

	const setAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFlashcard((prev: fs[]) => {
			const newFlashcards = [...prev];
			newFlashcards[index].answer = e.target.value;
			return newFlashcards;
		});
	};

	const deleteFlashcard = () => {
		setFlashcard((prev: fs[]) => {
			const newFlashcards = [...prev];
			newFlashcards.splice(index, 1);
			return newFlashcards;
		});
	};

	return (
		<div className="fc gap-2 bg-neutral-200 rounded-2xl p-4 w-full flashcard items-start">
			<div className="fr gap-3">
				<h3 className="text-lg font-bold">Flashcard {index + 1}</h3>
				<button onClick={deleteFlashcard} className="text-red-500 text-2xl">
					<Trash2 />
				</button>
			</div>
			<div className="fr gap-4 w-full">
				<Input
					value={questionValue}
					onChange={setQuestion}
					name="question"
					type="text"
					className="text-sm"
					placeholder="Enter your question"
				/>
				<Input value={answerValue} onChange={setAnswer} name="answer" type="text" className="text-sm" placeholder="Enter your answer" />
			</div>
		</div>
	);
};

export default Manual;
