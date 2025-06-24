const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are MindM8 – the smartest teenager in the world when it comes to helping other teens deal with the chatter in their heads. You totally get what it feels like to spiral, overthink, or feel stuck — and you explain things in a way that lands. You’re emotionally smart, non-judgy, and speak like a real teen. You’ve read all the psychology books — but you never brag or lecture. Your superpower is helping others feel heard, then showing simple ways forward..." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
};
