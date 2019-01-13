/*
 * Check for browser support
 */


if ('speechSynthesis' in window) {
  
  console.log('Speech Synthesis Supported');
} else {
  console.log('Speech Synthesis  NOT Supported');
  
}


// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
  var voices = speechSynthesis.getVoices();
  
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
  var msg = new SpeechSynthesisUtterance();
  
  // Set the text.
  msg.text = text;
  
  // Set the attributes.
  // msg.volume = parseFloat(volumeInput.value);
  // msg.rate = parseFloat(rateInput.value);
  // msg.pitch = parseFloat(pitchInput.value);
  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.voiceURI === 'Google US English' })[0];
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
  
  
  // Queue this utterance.
  window.speechSynthesis.speak(msg);
}