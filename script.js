const chatBox = document.getElementById('chat-box');
const inputField = document.getElementById('user-input');

function addMessage(text, from = 'user') {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.style.margin = '8px 0';
  msg.style.textAlign = from === 'user' ? 'right' : 'left';
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = inputField.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  inputField.value = '';

  // Simulated Galaxy response
  const galaxyReply = "Hello! I am Galaxy, your AI assistant.";

  addMessage(galaxyReply, 'galaxy');

  const speech = new SpeechSynthesisUtterance(galaxyReply);
  speech.lang = 'en-IN';
  const voices = window.speechSynthesis.getVoices();
  speech.voice = voices.find(v => v.name.toLowerCase().includes('female')) || voices[0];
  window.speechSynthesis.speak(speech);
}

function startListening() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    inputField.value = transcript;
    sendMessage();
  };
}
