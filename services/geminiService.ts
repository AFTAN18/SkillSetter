import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateCareerAdvice = async (
  conversationHistory: { role: string; parts: { text: string }[] }[],
  userContext: string
) => {
  if (!ai) return "AI Service Unavailable: Please configure API Key.";

  try {
    const model = 'gemini-3-flash-preview';
    
    // We construct a chat session or a single generation call. 
    // For this stateless service function, we'll use generateContent with history as context.
    const systemInstruction = `
      You are Setu, a senior career counselor for India's National Skill Qualification Framework (NSQF).
      User Context: ${userContext}
      
      Rules:
      1. Be encouraging but realistic.
      2. Suggest roles based on high market demand in India.
      3. Keep answers under 100 words unless asked for detail.
      4. Use simple English suitable for non-native speakers.
    `;

    const contents = conversationHistory.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: msg.parts
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the career database right now. Please try again.";
  }
};

export const generateLearningPath = async (userProfile: any) => {
  if (!ai) return null;

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Generate a JSON learning path for a student with this profile:
      ${JSON.stringify(userProfile)}
      
      The path should have 4-6 nodes.
      Each node needs: id, title, type (course/assessment/project), duration_hours, description.
      Output ONLY raw JSON.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Path Generation Error:", error);
    return null;
  }
};