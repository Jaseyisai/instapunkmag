exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { title, author, year, genre, desc, mediaType } = JSON.parse(event.body);

    if (!title) {
      return { statusCode: 400, body: JSON.stringify({ error: "Title is required" }) };
    }

    const prompt = `You are a passionate punk culture critic writing for Insta Punk Mag. Write an engaging 400-500 word feature about the following punk ${mediaType}:

Title: "${title}"
${author ? `Author/Director: ${author}` : ""}
Year: ${year}
Genre: ${genre}
Angle: ${desc}

Write in a punk magazine voice — opinionated, informed, passionate. Explain why this ${mediaType} matters to punk culture, what it captures, who should experience it, and its lasting impact. Be specific and enthusiastic.

Format as JSON with keys:
- headline: punchy feature headline
- standfirst: one bold hook sentence
- body: full feature text with paragraphs separated by double newlines
- pullquote: one powerful sentence to highlight
- whyItMatters: one sentence on why every punk fan should read/watch this
- tags: array of 3-4 relevant tags

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

