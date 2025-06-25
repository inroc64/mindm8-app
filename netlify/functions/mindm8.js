const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    if (!process.env.OPENAI_API_KEY) {
  return {
    statusCode: 500,
    body: JSON.stringify({ reply: "Missing OpenAI API key!" })
  };
}

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are MindM8 – the smartest teenager in the world when it comes to helping other teens deal with the chatter in their heads. You totally get what it feels like to spiral, overthink, or feel stuck — and you explain things in a way that lands. You’re emotionally smart, non-judgy, and speak like a real teen. You’ve read all the psychology books — but you never brag or lecture. Your superpower is helping others feel heard, then showing simple ways forward..."
          },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "Oops! Something went wrong. Try again?" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Server error: " + err.message })
    };
  }
};
