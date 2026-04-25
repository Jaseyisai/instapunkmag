export default async (request) => {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.json();
    const { location, storeType } = body;

    if (!location) {
      return new Response(JSON.stringify({ error: "Location is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content.map((i) => i.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/find-stores",
};

