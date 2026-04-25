exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { title, genre, desc } = JSON.parse(event.body);

    if (!title) {
      return { statusCode: 400, body: JSON.stringify({ error: "Title is required" }) };
    }

    const prompt = `You are a passionate Christian punk and hardcore music writer for Insta Punk Mag. Write an engaging 400-500 word music feature about the following Christian artist or topic:

Artist/Topic: "${title}"
Genre: ${genre}
Angle: ${desc}

Write in an energetic, faith-positive punk magazine voice — passionate, informed, and accessible to both believers and curious outsiders. Include references to the band's faith, musical influences, similar Christian artists, and what makes this music significant. Treat the faith element with respect and authenticity.

Format as JSON with keys:
- headline: punchy article headline
- standfirst: one bold hook sentence
- body: full feature text with paragraphs separated by double newlines
- pullquote: one powerful sentence to highlight
- listenTo: array of 3 song or album recommendations related to this artist or topic
- tags: array of 3-4 genre/topic tags

Return ONLY the JSON, no preamble or markdown.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
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

