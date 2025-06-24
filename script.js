
async function getMindM8Reply(message) {
  const response = await fetch("/.netlify/functions/mindm8", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data.reply;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  if (!message) return;
  appendToChat("You: " + message);
  input.value = "";

  getMindM8Reply(message).then(response => {
    appendToChat("MindM8: " + response);
    askHelpful();
  });
}

function appendToChat(text) {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += "<div>" + text + "</div>";
  chatbox.scrollTop = chatbox.scrollHeight;
}

function askHelpful() {
  appendToChat("Was that helpful? 👍 👎");
}
