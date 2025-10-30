// Mode switch
const signToTextBtn = document.getElementById("signToTextBtn");
const textToSignBtn = document.getElementById("textToSignBtn");
const signToTextMode = document.getElementById("signToTextMode");
const textToSignMode = document.getElementById("textToSignMode");
const toast = document.getElementById("toast");

signToTextBtn.addEventListener("click", () => switchMode("sign"));
textToSignBtn.addEventListener("click", () => switchMode("text"));

function switchMode(mode) {
  if (mode === "sign") {
    signToTextMode.classList.add("active");
    textToSignMode.classList.remove("active");
    signToTextBtn.classList.add("active");
    textToSignBtn.classList.remove("active");
  } else {
    textToSignMode.classList.add("active");
    signToTextMode.classList.remove("active");
    textToSignBtn.classList.add("active");
    signToTextBtn.classList.remove("active");
  }
}

// Toast
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Camera simulation
const camera = document.getElementById("camera");
const startCameraBtn = document.getElementById("startCameraBtn");
const stopCameraBtn = document.getElementById("stopCameraBtn");
const recognizedSigns = document.getElementById("recognizedSigns");
const translatedText = document.getElementById("translatedText");
let stream = null;
let simulateInterval;

startCameraBtn.onclick = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    camera.srcObject = stream;
    showToast("Camera started!");
    simulateRecognition();
  } catch (err) {
    showToast("Camera access denied!");
  }
};

stopCameraBtn.onclick = () => {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
    clearInterval(simulateInterval);
    showToast("Camera stopped!");
  }
};

// Simulated Sign Recognition
function simulateRecognition() {
  const fakeSigns = ["Hello", "Thank You", "I Love You", "Good Morning"];
  simulateInterval = setInterval(() => {
    const rand = fakeSigns[Math.floor(Math.random() * fakeSigns.length)];
    const confidence = (Math.random() * 0.5 + 0.5).toFixed(2);
    recognizedSigns.innerText = `Detected: ${rand} (Conf: ${confidence})`;
    translatedText.innerText += rand + " ";
  }, 1500);
}

// Text-to-speech and Avatar Animation
const inputText = document.getElementById("inputText");
const playAvatarBtn = document.getElementById("playAvatarBtn");
const speakBtn = document.getElementById("speakBtn");
const recordBtn = document.getElementById("recordBtn");
const leftArm = document.querySelector(".arm-left");
const rightArm = document.querySelector(".arm-right");

playAvatarBtn.onclick = () => {
  leftArm.classList.add("wave");
  rightArm.classList.add("wave");
  showToast("Avatar signing...");
  setTimeout(() => {
    leftArm.classList.remove("wave");
    rightArm.classList.remove("wave");
  }, 3000);
};

// Speech synthesis
speakBtn.onclick = () => {
  const text = inputText.value.trim();
  if (!text) return showToast("Enter text first!");
  const utter = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utter);
  showToast("Speaking...");
};

// Speech recognition
recordBtn.onclick = () => {
  if (!("webkitSpeechRecognition" in window)) {
    return showToast("Speech recognition not supported!");
  }
  const rec = new webkitSpeechRecognition();
  rec.lang = "en-IN";
  rec.start();
  showToast("Listening...");
  rec.onresult = (e) => {
    inputText.value = e.results[0][0].transcript;
    showToast("Voice captured!");
  };
};
