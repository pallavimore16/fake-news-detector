export default async function handler(req, res) {
  const { text } = req.body;

  const API_KEY = "YOUR_API_KEY";

  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(text)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.claims && data.claims.length > 0) {
  res.status(200).json({
    result: "⚠️ This claim has been fact-checked. Check sources below.",
    source: data.claims[0].claimReview[0].url
  });
} else {
  res.status(200).json({
    result: "❓ No data found. Could be new or unverified information."
  });
}

  } catch (error) {
    res.status(500).json({ result: "Error checking news" });
  }
}