import * as ele from "/utils/elements.js";
import * as fun from "/utils/functions.js";

const speechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition;



if (speechRecognition) {
  const recognition = new speechRecognition();
  ele.mic.addEventListener("click", enableMic);
  function enableMic(e) {
    e.preventDefault();
    if (ele.mic.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", () => {
    ele.mic.classList.remove("fa-microphone");
    ele.mic.classList.add("fa-microphone-slash");
    ele.header.classList.remove("bg-primary");
    ele.header.classList.add("bg-success");
    ele.instruction.textContent = "Listening...";
    ele.searchInput.focus();
  });

  recognition.addEventListener("end", () => {
    ele.mic.classList.remove("fa-microphone-slash");
    ele.mic.classList.add("fa-microphone");
    ele.header.classList.remove("bg-success");
    ele.header.classList.add("bg-primary");
    ele.instruction.textContent = "Click the mic icon to start";
    ele.searchInput.focus();
  });

  recognition.continuous = true;

  let content = "";

  recognition.addEventListener("result", (e) => {
    const speech = e.resultIndex;
    const transcript = e.results[speech][0].transcript;
    content += transcript;
    ele.searchInput.value = content;
    searchInput.focus();
  });

 
} else {
  alert("Speech Web API is not supported");
  ele.speechContainer.style.visibility = "hidden";
}
