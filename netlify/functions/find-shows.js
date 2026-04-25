exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { location } = JSON.parse(event.body);

    if (!location) {
      return { statusCode: 400, body: JSON.stringify({ error: "Location is required" }) };
    }

    const prompt = `You are a punk music scene guide. For the location: "${location}", list 6 realistic punk, hardcore, or alternative shows or venues that a punk fan would love to check out.

For each result include:
- venue: the venue or bar name
- band: headlining band or bands on the bill (make them sound like real local punk bands)
- genre: punk subgenre (e.g. Hardcore, Pop Punk, Ska Punk, Post-Punk, Oi!, Anarcho-Punk)
- vibe: one sentence describing the show or venue atmosphere
- tip: one practical tip for attending (e.g. get there early, all ages show, BYOB, etc.)

Format as JSON array with keys: venue, band, genre, vibe, tip. Return ONLY the JSON array, no preamble.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!data.content || !data.content[0]) {
      return { statusCode: 500, body: JSON.stringify({ error: "No response from AI." }) };
    }

    const text = data.content.map((i) => i.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Something went wrong: " + err.message }),
    };
  }
};

