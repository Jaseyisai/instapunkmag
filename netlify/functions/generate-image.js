exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { prompt, seed } = JSON.parse(event.body);

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Prompt is required" }) };
    }

    const encoded = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=800&height=600&seed=${seed || Math.floor(Math.random() * 999999)}&nologo=true`;

    // Fetch the image from Pollinations server-side to avoid CORS
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Image generation failed" }),
      };
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
      body: base64,
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Something went wrong: " + err.message }),
    };
  }
};

