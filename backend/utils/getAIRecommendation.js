export const getAIRecommendation = async (req, res, userPrompt, filteredProducts) => {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY)
      return res.status(500).json({ success: false, message: "Missing API key" });

    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const prompt = `
      User prompt: ${userPrompt}
      Here is a list of products: ${JSON.stringify(filteredProducts, null, 2)}
      Respond ONLY with a valid JSON array of recommended products.
    `;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    const data = await response.json();

    const aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const cleanedText = aiResponseText.replace(/```json|```/g, "").trim();

    if (!cleanedText)
      return res.status(500).json({ success: false, message: "AI response is empty or invalid." });

    let parsedProducts;
    try {
      parsedProducts = JSON.parse(cleanedText);
    } catch {
      return res.status(500).json({ success: false, message: "Failed to parse AI response." });
    }

    return res.status(200).json({ success: true, products: parsedProducts});

  } catch {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
