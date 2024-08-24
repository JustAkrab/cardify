"use client";
import { Sparkles } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { generateFromText, OCR } from "../../actions";
import { toast } from "sonner";
import Flashcards from "@/components/flashcards/flashcards";
import { FlashcardResponse } from "../../types";
import { FileUpload } from "@/components/file-upload";
import dynamic from "next/dynamic";

const Text = () => {
  const [generatedCards, setGeneratedCards] = useState<
    FlashcardResponse[] | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    // create a blob from the file
    setFile(file);
    console.log(file);
    const reader = new FileReader();
    console.log(reader);
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      return;
      const generated: FlashcardResponse[] = await generateFromText(
        text as string,
      );
      setGeneratedCards(generated);
    };
    return;
    const supabaseURL = `https://www.transportation.gov/sites/dot.gov/files/docs/maccracken2_Global-Warming.pdf`;
    const promise = new Promise(async (resolve, reject) => {
      const bro = await OCR(supabaseURL);

      console.log(bro);
      if (bro) {
        resolve("Generated!");
      } else {
        reject("Failed to generate");
      }

      // transform to have id   id: number;
      // frontHTML: JSX.Element;
      // backHTML: JSX.Element;
      //
    });

    toast.promise(promise, {
      loading: "Generating...",
      success: "Generated!",
      error: "Failed to generate",
    });
  };

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
        <h2>Generate from PDF</h2>
      </div>
      <div className="w-full max-w-4xl my-12 min-h-96 fc border border-dashed bg-white border-neutral-200 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
      <form onSubmit={handleSubmit} className="fc gap-3 items-start mt-5">
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

// register
