"use client";
import { Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { generateFromText } from "../../actions";
import { toast } from "sonner";
import Flashcards from "@/components/flashcards/flashcards";
import { FlashcardResponse } from "../../types";

const Text = () => {
  const [generatedCards, setGeneratedCards] = useState<
    FlashcardResponse[] | null
  >(null);
  // loading state

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = formData.get("text") as string;

    const promise = new Promise(async (resolve, reject) => {
      const generated: FlashcardResponse[] = await generateFromText(text);
      if (generated) {
        resolve("Generated!");
      } else {
        reject("Failed to generate");
      }

      // transform to have id   id: number;
      // frontHTML: JSX.Element;
      // backHTML: JSX.Element;
      //

      setGeneratedCards(generated);
    });

    toast.promise(promise, {
      loading: "Generating...",
      success: "Generated!",
      error: "Failed to generate",
    });
  };

  return (
    <div className="w-full">
      <div className="text-3xl font-bold fr gap-2 justify-start">
        <Sparkles />
        <h2>Generate from Text</h2>
      </div>

      <form onSubmit={handleSubmit} className="fc gap-3 items-start mt-5">
        <textarea
          name="text"
          rows={15}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter text to generate from..."
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Generate
        </button>
      </form>
      <Flashcards cards={generatedCards} />
    </div>
  );
};
export default Text;
