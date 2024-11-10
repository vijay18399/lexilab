import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  private readonly scalar = 2;
  private readonly symbols = ['🅰', '🅱', '🅲', '🅳', '🅴', '🅵', '🅶', '🅷', '🅸', '🅹', '🅺', '🅻', '🅼', '🅽', '🅾', '🅿', '🆀', '🆁', '🆂', '🆃', '🆄', '🆅', '🆆', '🆇', '🆈', '🆉'];
  private readonly customShapes = this.symbols.map(symbol => confetti.shapeFromText({ text: symbol, scalar: this.scalar }));

  private readonly confettiDefaults = {
    spread: 360,
    ticks: 60,
    gravity: 0.3,
    decay: 0.96,
    startVelocity: 30,
    shapes: this.customShapes,
    scalar: this.scalar
  };

  constructor() {}
  fire(particleRatio: number, opts: confetti.Options | undefined) {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }
  shootConfetti() {

    this.fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    this.fire(0.2, {
      spread: 60,
    });
    this.fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

  }


}
