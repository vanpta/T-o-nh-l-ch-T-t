
import { GoogleGenAI } from "@google/genai";
import { STYLE_PROMPTS, COSTUME_PROMPTS } from "../constants";
import { StylePreset, Costume, AspectRatio } from "../types";

export const generateArtisticImage = async (
  base64Image: string,
  style: StylePreset,
  costume: Costume,
  userPrompt: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-2.5-flash-image for high-quality image generation with reference
  const model = 'gemini-2.5-flash-image';
  
  const stylePrompt = STYLE_PROMPTS[style];
  const costumePrompt = COSTUME_PROMPTS[costume];
  
  const fullPrompt = `Photorealistic professional photography. 
    Subject: The person in the reference image. 
    Action: ${stylePrompt}.
    Costume: ${costumePrompt}.
    Setting: Vietnamese Lunar New Year (Tet).
    Additional details: ${userPrompt}.
    
    CRITICAL REQUIREMENTS:
    1. 100% EXACT FACE IDENTITY PRESERVATION. The facial features, skin texture, and bone structure must remain exactly as shown in the reference image.
    2. Realism: The image must look like a real photo, not a drawing or digital painting. 
    3. Lighting: Use natural, realistic cinematic lighting.
    4. Atmosphere: Festive, elegant, and culturally accurate for Vietnam.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          { text: fullPrompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        }
      }
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) throw new Error("No image data received from API");
    return imageUrl;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
