async function checkNews() {
  const msg = document.getElementById("message").value;

  document.getElementById("output").innerText = "Checking...";

  const res = await fetch('/api/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: msg })
  });

  const data = await res.json();

  document.getElementById("output").innerHTML = `
    <p>${data.result}</p>
    <p>Confidence: ${data.confidence}%</p>
    <a href="${data.source}" target="_blank">View Source</a>
  `;
}