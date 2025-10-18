
import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLanguagePrompt = (language: Language): string => {
    switch (language) {
        case 'Urdu':
            return 'in Urdu script.';
        case 'Roman Urdu':
            return 'in Roman Urdu (Urdu written with the English alphabet).';
        case 'English':
        default:
            return 'in English.';
    }
}

export const generateQuote = async (topic: string, language: Language): Promise<string> => {
    if (!topic.trim()) {
        throw new Error("Topic cannot be empty.");
    }

    const languageInstruction = getLanguagePrompt(language);
    const prompt = `Generate a short, inspirational, and profound quote about "${topic}" ${languageInstruction} The quote should be suitable for a picture frame. Return only the quote text itself, without any introductory phrases, explanations, or quotation marks.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating quote from Gemini API:", error);
        throw new Error("Failed to generate quote. Please check your API key and try again.");
    }
};
