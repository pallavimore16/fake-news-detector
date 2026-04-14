export default async function handler(req, res) {
  const { text } = req.body;

  const API_KEY = "YOUR_API_KEY";

  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(text)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.claims && data.claims.length > 0) {
      res.status(200).json({
        result: "❌ Likely FAKE (Found fact-check articles)"
      });
    } else {
      res.status(200).json({
        result: "✅ No fact-check found (May be REAL or unverified)"
      });
    }

  } catch (error) {
    res.status(500).json({ result: "Error checking news" });
  }
}