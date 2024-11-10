import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <div class="center-body">
      <div>
        <svg  [ngStyle]="{  color : color }" class="loader-circle-66" viewbox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
          <circle cx="48" cy="48" r="42" />
        </svg>
      </div>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--loader-bg-color, #FAFAFA);
    }
    .center-body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .loader-circle-66 {
      animation: loader-circle-66-spin 4s linear infinite;
      color: #01579E;
      fill: none;
      height: 96px;
      stroke: currentColor;
      stroke-dasharray: 21.9556274414 0 21.9556274414;
      stroke-dashoffset: 263.4675292969;
      stroke-linecap: round;
      stroke-linejoin: miter;
      stroke-width: 10;
      vertical-align: top;
      width: 96px;
    }
    @keyframes loader-circle-66-spin {
      100% {
        stroke-dashoffset: 0;
      }
    }
  `]
})
export class Loader {
  @Input() color: string = '#FAFAFA';
}
