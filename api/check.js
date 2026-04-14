export default async function handler(req, res) {
  const { text } = req.body;
  const API_KEY = process.env.API_KEY;

  const keywords = text.split(" ").slice(0, 5).join(" ");

  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(keywords)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    let result = "";
    let confidence = 0;
    let source = "#";

    if (data.claims && data.claims.length > 0) {
      result = "⚠️ Likely Fake or Misleading";
      confidence = 80;
      source = data.claims[0].claimReview[0].url;
    } else {
      // Extra smart logic
      if (text.includes("forward this") || text.includes("urgent") || text.includes("share")) {
        result = "⚠️ Suspicious Message Pattern Detected";
        confidence = 60;
      } else {
        result = "❓ No fact-check found (Unverified)";
        confidence = 30;
      }
    }

    res.status(200).json({ result, confidence, source });

  } catch (error) {
    res.status(500).json({ result: "Error", confidence: 0 });
  }
}