const greetingElement = document.getElementById('greeting');
const speechBtn = document.getElementById('speechBtn');
const speechResult = document.getElementById('speechResult');
const locationResult = document.getElementById('locationResult');
const orientationResult = document.getElementById('orientationResult');

function toggleGreeting() {
  greetingElement.textContent = greetingElement.textContent === 'Hello, World!' ? 'Welcome to PWA!' : 'Hello, World!';
}

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecognizing = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    speechResult.textContent = `Speech Result: ${transcript}`;
    if (transcript.includes('hello')) {
      greetingElement.textContent = 'Hello, World!';
    } else if (transcript.includes('welcome')) {
      greetingElement.textContent = 'Welcome to PWA!';
    } else {
      speechResult.textContent = `Speech Result: Say "hello" or "welcome" to change the greeting`;
    }
  };

  recognition.onerror = (event) => {
    speechResult.textContent = `Speech Error: ${event.error}`;
    speechBtn.textContent = 'Start Speech Recognition';
    isRecognizing = false;
  };

  recognition.onend = () => {
    speechBtn.textContent = 'Start Speech Recognition';
    isRecognizing = false;
  };
}

function toggleSpeechRecognition() {
  if (!recognition) {
    speechResult.textContent = 'Speech Recognition not supported in this browser';
    return;
  }
  if (isRecognizing) {
    recognition.stop();
    isRecognizing = false;
    speechBtn.textContent = 'Start Speech Recognition';
  } else {
    recognition.start();
    isRecognizing = true;
    speechBtn.textContent = 'Stop Speech Recognition';
    speechResult.textContent = 'Speech Result: Listening...';
  }
}

// Geolocation
function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationResult.textContent = `Location: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`;
      },
      (error) => {
        locationResult.textContent = `Location Error: ${error.message}`;
      }
    );
  } else {
    locationResult.textContent = 'Location: Geolocation not supported';
  }
}

// Device Orientation
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (event) => {
    orientationResult.textContent = `Orientation: Pitch ${Math.round(event.beta)}°, Roll ${Math.round(event.gamma)}°`;
  });
} else {
  orientationResult.textContent = 'Orientation: Device Orientation not supported';
}

// Vibration
function toggleVibration() {
  if ('vibrate' in navigator) {
    navigator.vibrate(200);
    locationResult.textContent = 'Vibration: Triggered (200ms)';
  } else {
    locationResult.textContent = 'Vibration: Not supported';
  }
}
