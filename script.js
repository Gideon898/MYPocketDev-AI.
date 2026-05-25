const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// session memory
let messages = [];

btn.onclick = sendMessage;

function add(text, type){
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

async function sendMessage(){

  const text = input.value.trim();
  if(!text) return;

  add(text, "user");
  input.value = "";

  messages.push({
    role: "user",
    content: text
  });

  const bot = add("thinking...", "bot");

  try{

    const res = await fetch("/api/chat", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await res.json();

    const reply = data.reply || "No response";

    bot.innerText = reply;

    messages.push({
      role: "assistant",
      content: reply
    });

  }catch(err){
    bot.innerText = "Server error";
  }
}
