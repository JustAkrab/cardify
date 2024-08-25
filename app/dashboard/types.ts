export interface Flashcard {
	id: number;
	frontHTML: JSX.Element;
	backHTML: JSX.Element;
}

export interface FlashcardResponse {
	id: number;
	question: string;
	answer: string;
}

export interface FlashcardDeck {
	title: string;
	description: string;
	flashcards: FlashcardResponse[];
}
