"use server";
import { google } from "@ai-sdk/google";

import { generateObject } from "ai";
import { z } from "zod";

export const generateFromText = async (text: string) => {
  // get text

  const { object } = await generateObject({
    model: google("models/gemini-1.5-flash-latest"),
    schema: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    prompt:
      "Generate flashcards from this content (Markdown can be utilized for question and answer): " +
      text,
  });

  // make each object in the array have an id key based on the index
  const newObject = object.map((obj, index) => {
    return {
      id: index,
      ...obj,
    };
  });

  console.log(JSON.stringify(newObject, null, 2));
  return newObject;
};

export const OCR = async (url: string) => {
  console.log(url);
  const response = await fetch(
    `https://api.ocr.space/parse/imageurl?apikey=${process.env.OCR_API_KEY}&url=${url}&filetype=PDF`,
  );
  const data = await response.json();
  if (data) {
    data.ParsedResults.map((result: any) => {
      console.log(result.ParsedText);
    });
  }
  return data;
};
