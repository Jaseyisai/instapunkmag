exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { location, storeType } = JSON.parse(event.body);

    if (!location) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Location is required" }),
      };
    }

    const typeLabel =
      storeType === "all"
        ? "mainstream punk/alternative clothing stores AND thrift stores"
        : storeType === "thrift"
        ? "thrift stores and secondhand shops"
        : "mainstream punk and alternative clothing stores";

    const prompt = `You are a local shopping guide for punk and alternative culture. For the location: "${location}", list 6 real or plausible ${typeLabel} that a punk fan would love.

For each store include:
- name (real store name or chain)
- type (Thrift Store, Mainstream Punk/Alt, Vintage, Independent Boutique, or Online with Local Pickup)
- why a punk would shop there (1 sentence)
- example items they'd find

Format as JSON array with keys: name, type, reason, items. Return ONLY the JSON array, no preamble.`;

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
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No response from AI. Please try again." }),
      };
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
