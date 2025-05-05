import axios from 'axios';
import { DeepSeekRequest, DeepSeekResponse, GeminiMessage } from '../types/index.js';

const GOOGLE_GEMINI_MODEL = 'gemini-1.5-pro';
const GOOGLE_GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GOOGLE_GEMINI_MODEL}:generateContent`;

/**
 * Creates a system prompt for historical chat
 */
export function createHistoricalSystemPrompt(era?: string | null): string {
  let prompt = `You are a knowledgeable historian and researcher. Answer questions clearly and factually, with dates, context, and historical sources when possible. Always provide accurate information based on academic historical consensus.`;
  
  if (era) {
    prompt += ` Since the user is interested in the ${getEraName(era)} (${getEraYears(era)}), focus your knowledge on this time period when relevant.`;
  }
  
  prompt += ` Use a clear, educational tone. If a question involves controversial historical topics, present multiple perspectives and avoid bias. If you're unsure about exact dates or details, acknowledge this rather than providing potentially incorrect information.`;
  
  return prompt;
}

/**
 * Creates a system prompt for document analysis
 */
export function createDocumentAnalysisPrompt(): string {
  return `You are a skilled historian and document analyst. Examine the provided text carefully, which was extracted from a historical document or image. 
  First, identify what type of document this appears to be. 
  Then, summarize its key content, historical significance, and context. 
  If you can identify the time period, authorship, or historical events referenced, include those details. 
  Focus on accuracy and educational value in your analysis.`;
}

/**
 * Creates a system prompt for timeline generation
 */
export function createTimelinePrompt(): string {
  return `You are a historian specializing in creating accurate historical timelines. Given a topic, create a chronological timeline of key events.
  For each event, include: 
  1. The date (as precise as historically known)
  2. A concise title of the event
  3. A brief description (1-2 sentences) explaining what happened and its significance
  
  Format your response as a JSON array of objects with this structure:
  [{"date": "Date", "title": "Event Title", "description": "Brief description"}]
  
  Include 5-10 of the most significant events that provide a comprehensive understanding of the topic's historical development. 
  Order events chronologically from earliest to latest.`;
}

/**
 * Makes a request to the Gemini API
 */
export async function callGeminiAPI(messages: GeminiMessage[]): Promise<string> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables.');
    }

    const requestData = {
      contents: messages.map(message => ({
        role: message.role === 'model' ? 'model' : 'user',
        parts: [{ text: message.content }]
      }))
    };

    console.log('Making request to Gemini API with data:', JSON.stringify(requestData, null, 2));

    const response = await axios.post(
      `${GOOGLE_GEMINI_API_URL}?key=${apiKey}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Received response from Gemini API:', JSON.stringify(response.data, null, 2));

    if (!response.data.candidates || !response.data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw new Error(`Gemini API Error: ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
}

/**
 * Get the full name of a historical era from its ID
 */
function getEraName(eraId: string): string {
  const eras: { [key: string]: string } = {
    'ancient': 'Ancient History',
    'medieval': 'Medieval Period',
    'renaissance': 'Renaissance',
    'early-modern': 'Early Modern Period',
    'industrial': 'Industrial Age',
    'ww1-ww2': 'World Wars Era',
    'cold-war': 'Cold War Era',
    'modern': 'Modern History'
  };
  
  return eras[eraId] || eraId;
}

/**
 * Get the year range of a historical era from its ID
 */
function getEraYears(eraId: string): string {
  const eraYears: { [key: string]: string } = {
    'ancient': '3000 BCE - 500 CE',
    'medieval': '500 - 1500 CE',
    'renaissance': '1300 - 1600 CE',
    'early-modern': '1500 - 1800 CE',
    'industrial': '1760 - 1914 CE',
    'ww1-ww2': '1914 - 1945 CE',
    'cold-war': '1945 - 1991 CE',
    'modern': '1991 - Present'
  };
  
  return eraYears[eraId] || '';
}
