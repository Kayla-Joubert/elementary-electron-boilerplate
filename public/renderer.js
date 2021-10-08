let emitsSounds = false;

function setText(text, elem) {
  document.querySelector(elem).textContent = text
}

const setBGC = (message) => {
  let noteOnOff = message.data[2];
  let randomColor = Math.floor(Math.random() * 16777215).toString(16)
  if (noteOnOff === 0) {
    document.querySelector('body').style.backgroundColor = `#${randomColor}`;
    document.querySelector('#instrument').style.color = `#${randomColor}`;
  } else {
    document.querySelector('body').style.backgroundColor = `#${randomColor}`;
    document.querySelector('#instrument').style.color = `#${randomColor}`;
  }
}

const getNoteName = (noteNumber) => {
  noteNumber -= 21; // see the explanation below.
  let notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  let octave = Math.floor(noteNumber / 12) + 1;
  let name = notes[noteNumber % 12];
  // return name + octave;
  // console.log(name, octave)
  return [name, octave];

}

const displayNote = (message) => {
  let midiNote = message.data[1];
  let note = getNoteName(midiNote)
  setText(note[0], '#note')
  setText(note[1], '#octave')

}
// window.onload = (event) => {
//   console.log('page is fully loaded');
// };
navigator.requestMIDIAccess().then(midiAccess => {
  Array.from(midiAccess.inputs).forEach(input => {
    input[1].onmidimessage = (msg) => { console.log(msg); }
  })

  midiAccess.inputs.forEach((input) => {
    let instrument = input.name; /* inherited property from MIDIPort */
    input.onmidimessage = function (message) {
      setBGC(message)
      displayNote(message)
    }
    setText(instrument, '#instrument')

  })
});
// function handleKeydown(e) {
//   if (e.key === "a") {
//     makeNoise();
//   }
// }
// function makeNoise() {
//   emitsSounds = true;
//   window.electron.sendMessage({
//     type: "emit-sound",
//     value: {
//       gain: 1,
//       frequency: 440,
//     },
//   });
// }
// function stopSound() {
//   if (emitsSounds) {
//     window.electron.sendMessage({
//       type: "stop-sound",
//       value: {
//         gain: 0,
//         frequency: 0,
//       },
//     });
//     emitsSounds = false;
//   }
// }
// window.electron.onUpdate((_, message) => {
//   document.getElementById("tone").innerHTML =
//     message.type === "emit-sound"
//       ? `${message.value.frequency}hz`
//       : "No Tone Playing";
// });
// document
//   .getElementById("makeNoiseButton")
//   .addEventListener("mousedown", makeNoise);
// document.addEventListener("keydown", handleKeydown);
// document.addEventListener("keyup", stopSound);
// document.addEventListener("mouseup", stopSound);
