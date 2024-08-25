'use server';
import ytdl from 'ytdl-core';
import { google } from '@ai-sdk/google';

import { generateObject } from 'ai';
import { z } from 'zod';

export const generateFromText = async (text: string) => {
	// get text

	const { object } = await generateObject({
		model: google('models/gemini-1.5-flash-latest'),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			flashcards: z.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				})
			),
		}),
		prompt:
			'Generate a flashcard deck from this content. For the title and description, only mention what the flashcards are about, dont state flashcards or deck Ex. dont start with "This deck covers the" etc.:' +
			text,
	});

	// make each object in the array have an id key based on the index
	const newObject = object.flashcards.map((obj, index) => {
		return {
			id: index,
			...obj,
		};
	});

	const newResponse = {
		...object,
		flashcards: newObject,
	};

	console.log(JSON.stringify(newObject, null, 2));
	return newResponse;
};

export const OCR = async (url: string) => {
	console.log(url);
	const response = await fetch(`https://api.ocr.space/parse/imageurl?apikey=${process.env.OCR_API_KEY}&url=${url}&filetype=PDF`);
	const data = await response.json();
	if (data) {
		data.ParsedResults.map((result: any) => {
			console.log(result.ParsedText);
		});
	}
	return data;
};

export const flashcardsFromYoutube = async (url: string) => {
	// fetch transcript from youtube video ytdlp-core
	// strip url to get video id
	const videoId = url.split('v=')[1];

	console.log(videoId);

	const info = await ytdl.getInfo(videoId);
	const transcript = info.player_response.captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl;
	console.log(transcript);

	// this is an XML file

	const response = await fetch(transcript);
	const data = await response.text();
	console.log(data);

	const { object } = await generateObject({
		model: google('models/gemini-1.5-flash-latest'),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			flashcards: z.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				})
			),
		}),
		prompt:
			'Generate a flashcard deck from this content. For the title and description, only mention what the flashcards are about, dont state flashcards or deck Ex. dont start with "This deck covers the" etc.: ' +
			data,
	});

	// make each object in the array have an id key based on the index
	const newObject = object.flashcards.map((obj, index) => {
		return {
			id: index,
			...obj,
		};
	});

	const newResponse = {
		...object,
		flashcards: newObject,
	};
	console.log(JSON.stringify(newResponse, null, 2));

	return newResponse;
};
