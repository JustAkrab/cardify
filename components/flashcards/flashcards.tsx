import { FlashcardResponse } from "@/app/dashboard/types";
import { FlashcardArray } from "react-quizlet-flashcard";

import ReactMarkdown from "react-markdown";

function Flashcards({ cards }: { cards: FlashcardResponse[] | null }) {
  if (!cards) return null;
  const newCards = cards.map((card) => {
    return {
      id: card.id,
      frontHTML: (
        <ReactMarkdown className="w-full h-full fc p-5">
          {card.question}
        </ReactMarkdown>
      ),
      backHTML: (
        <ReactMarkdown className="w-full h-full fc p-5">
          {card.answer}
        </ReactMarkdown>
      ),
    };
  });
  return <FlashcardArray cards={newCards} />;
}

export default Flashcards;
