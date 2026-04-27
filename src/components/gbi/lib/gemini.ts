export const callGemini = async (prompt: string): Promise<string> => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (attempt === delays.length) return "Failed to generate insights. Please try again later.";
      await new Promise(resolve => setTimeout(resolve, delays[attempt]));
    }
  }
  return "Failed to generate insights. Please try again later.";
};
