// Get the UI elements
const tempoInput = document.getElementById('tempo');
const toggleButton = document.getElementById('toggle');

// Flag for whether the metronome is currently running
let isRunning = false;

// Set up the audio context and oscillator
const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
oscillator.type = 'square';
oscillator.frequency.value = 440;
oscillator.start();

// Set up the gain node to control the volume
const gainNode = audioCtx.createGain();
gainNode.gain.value = 0;
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Function for starting the metronome
function start() {
    // Calculate the interval between beats based on the tempo
    const interval = (60 / tempoInput.value) * 1000;

    // Start the metronome
    isRunning = true;
    toggleButton.innerHTML = 'Stop';
    setInterval(() => {
        // Play a beat
        gainNode.gain.value = 1;
        setTimeout(() => {
            gainNode.gain.value = 0;
        }, 50);
    }, interval);
}

// Function for stopping the metronome
function stop() {
    // Stop the metronome
    isRunning = false;
    toggleButton.innerHTML = 'Start';
    clearInterval();
}

// Toggle the metronome when the button is clicked
toggleButton.addEventListener('click', () => {
    if (isRunning) {
        stop();
    } else {
        start();
    }
});