exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { title, category, excerpt } = JSON.parse(event.body);

    if (!title) {
      return { statusCode: 400, body: JSON.stringify({ error: "Title is required" }) };
    }

    const prompt = `You are a passionate, knowledgeable writer for Insta Punk Mag, an online punk culture magazine. Write a full, engaging magazine article about the following topic.

Title: "${title}"
Category: ${category}
Angle: ${excerpt}

Write a compelling 600-800 word article in a punk magazine voice — informed, opinionated, passionate, and accessible. Use short punchy paragraphs. Include real historical facts, band names, cultural references where relevant. 

Format your response as JSON with these keys:
- headline: the article title (can be slightly different/punchier than the original)
- standfirst: a one sentence bold intro that hooks the reader
- body: the full article text with paragraphs separated by double newlines
- pullquote: one powerful sentence from the article to highlight
- tags: array of 3-4 relevant topic tags

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
        max_tokens: 1500,
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

