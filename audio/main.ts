import MessageData from '../types/MessageData';
import EmitSoundEvent from '../types/EmitSoundEvent';
const el: any = require('@nick-thompson/elementary');
const core = require('elementary-core');

process.on('message', (rawMessage: MessageData) => {
  switch (rawMessage.type) {
    case 'emit-sound':
      emitSound(rawMessage.value as EmitSoundEvent);
      break;
    default:
      stopSound();
      break;
  }
});
core.on('load', () => {
  process.send!('elementary Core Loaded');
});

function emitSound(event: EmitSoundEvent) {
  process.send!(`Emitting ${event.frequency}hz at gain ${event.gain}`);
  renderTone(event.gain, event.frequency);
}
function stopSound() {
  renderTone(0, 0);
}

function renderTone(gain: number, frequency: number) {
  return core.render(
    el.mul(el.const({ key: 'jahzGate', value: gain }), el.cycle(el.const({ key: 'jahzFreq', value: frequency })))
  );
}
