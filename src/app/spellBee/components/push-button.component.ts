import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'push-button',
  template: `
    <button type="submit" (click)="onClick()" class="pushable">
      <span class="shadow" [ngStyle]="{'background': shadowColor}"></span>
      <span class="edge" [ngStyle]="{'background': edgeGradient}"></span>
      <span class="front" [ngStyle]="{'background': color}">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    .pushable {
      position: relative;
      background: transparent;
      padding: 0px;
      border: none;
      cursor: pointer;
      outline-offset: 4px;
      outline-color: deeppink;
      transition: filter 250ms;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .shadow {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 8px;
      filter: blur(2px);
      will-change: transform;
      transform: translateY(2px);
      transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    }

    .edge {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 8px;
    }

    .front {
      display: block;
      position: relative;
      border-radius: 8px;
      padding: 10px 18px;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 1rem;
      transform: translateY(-4px);
      transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    }

    .pushable:hover {
      filter: brightness(110%);
    }

    .pushable:hover .front {
      transform: translateY(-6px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    .pushable:active .front {
      transform: translateY(-2px);
      transition: transform 34ms;
    }

    .pushable:hover .shadow {
      transform: translateY(4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    .pushable:active .shadow {
      transform: translateY(1px);
      transition: transform 34ms;
    }

    .pushable:focus:not(:focus-visible) {
      outline: none;
    }
  `]
})
export class PushButton {
  @Input() color: string = 'hsl(248, 53%, 58%)'; // Default color if not provided
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  get shadowColor(): string {
    return this.adjustBrightness(this.color, -20); // Darker for shadow
  }

  get edgeGradient(): string {
    return `linear-gradient(
      to right,
      ${this.adjustBrightness(this.color, -10)} 0%,
      ${this.color} 8%,
      ${this.adjustBrightness(this.color, -10)} 92%,
      ${this.adjustBrightness(this.color, -20)} 100%
    )`;
  }

  onClick() {
    this.buttonClick.emit();
  }

  // Helper function to adjust brightness
  adjustBrightness(color: string, percent: number): string {
    const f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return `#${(
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)}`;
  }
}
