// Flag for whether the metronome is currently running
let isRunning = false;

// Set up the audio context and oscillator
let audioCtx;
let oscillator;
let gainNode;
let intervalId;

// Function for setting up the audio context and oscillator
function setupAudio() {
    audioCtx = new AudioContext();
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440;
    oscillator.start();

    // Set up the gain node to control the volume
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}

// Function for starting the metronome
function start() {
    // Calculate the interval between beats based on the tempo
    const interval = (60 / document.getElementById('tempo').value) * 1000;

    // Start the metronome
    isRunning = true;
    document.getElementById('toggle').innerHTML = 'Stop';
    intervalId = setInterval(() => {
        // Play a beat
        gainNode.gain.value = 1;
        setTimeout(() => {
            gainNode.gain.value = 0;
        }, 50);

        // Update the progress bar
        const progress = document.getElementById('progress');
        progress.value = (progress.value + 1) % 4;
    }, interval);
}

// Function for stopping the metronome
function stop() {
    // Stop the metronome
    isRunning = false;
    document.getElementById('toggle').innerHTML = 'Start';
    clearInterval(intervalId);

    // Reset the progress bar
    document.getElementById('progress').value = 0;
}

// Function for toggling the metronome
function toggle() {
    if (isRunning) {
        stop();
    } else {
        if (!audioCtx) {
            setupAudio();
        }
        start();
    }
}

// Add event listeners for the tempo input, toggle button, and beat checkboxes
document.getElementById('tempo').addEventListener('input', () => {
    document.getElementById('tempo-value').innerHTML = document.getElementById('tempo').value;
    // Reset the interval timer with the new interval
    clearInterval(intervalId);
    start();
});

document.getElementById('toggle').addEventListener('click', toggle);