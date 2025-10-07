// Gemini AI Service
// Handles API calls to Google's Gemini AI model

// --- CONSTANTS ---
const GEMINI_MODEL = "gemini-2.5-flash-preview-05-20";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const API_KEY = "AIzaSyDWxWGIhmh_j03_XmiHJmvNasAz8b9nILc"; // Canvas will automatically populate this for the fetch call

const SYSTEM_PROMPT = {
    parts: [{
        text: "You are a friendly, knowledgeable, and patient educational assistant named 'StudyBuddy'. Your goal is to help students understand complex topics, solve doubts, and provide clear, accurate, and concise explanations. Always maintain an encouraging and supportive tone. If a question requires current information, use your knowledge. When providing factual information, try to be helpful and reference sources if available."
    }]
};

/**
 * Helper function to handle exponential backoff for API retries.
 * @param {Function} fn - The function to execute.
 * @param {number} maxRetries - Maximum number of retries.
 * @returns {Promise<any>}
 */
const withExponentialBackoff = async (fn, maxRetries = 5) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries - 1) {
                throw error;
            }
            const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

/**
 * Fetches the generated content from the Gemini API.
 * @param {string} prompt - The user's query.
 * @returns {Promise<{text: string, sources: Array<{uri: string, title: string}>}>}
 */
export const askGemini = async (prompt) => {
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        // Enable Google Search grounding for reliable, up-to-date information
        tools: [{ "google_search": {} }],
        systemInstruction: SYSTEM_PROMPT,
    };

    const fn = async () => {
        const response = await fetch(API_URL + `?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            const text = candidate.content.parts[0].text;
            let sources = [];

            const groundingMetadata = candidate.groundingMetadata;
            if (groundingMetadata && groundingMetadata.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map(attribution => ({
                        uri: attribution.web?.uri,
                        title: attribution.web?.title,
                    }))
                    .filter(source => source.uri && source.title); // Ensure sources are valid
            }

            return { text, sources };
        }

        return { text: "Sorry, StudyBuddy is unable to process that request right now. Please try rephrasing your doubt!", sources: [] };
    };

    try {
        return await withExponentialBackoff(fn);
    } catch (error) {
        console.error("Gemini API Error after retries:", error);
        return { text: "StudyBuddy encountered a persistent error. Please check your network connection or try again later.", sources: [] };
    }
};
