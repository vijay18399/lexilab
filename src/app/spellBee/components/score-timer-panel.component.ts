import { Component, Input } from '@angular/core';

@Component({
  selector: 'score-timer-panel',
  template: `
    <div class="score-timer-panel">
      <div class="question-tracker">Question: {{ currentQuestion }}/{{ noOfQuestions }}</div>
      <div class="timer">
          <i class="fa-solid fa-stopwatch"></i>
          <span> {{ formatTime(timeLeft) }} </span>
      </div>
    </div>
  `,
  styles: [
    `
      .score-timer-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        width: 100%;
      }

      .score, .timer, .question-tracker {
        font-size: 1rem;
        color: #212121;
        font-weight: 500;
        padding: 0px 13px;
        width: max-content;
        height: 30px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        i{
          margin: 4px;
        }
      }
      .score {
        color: #43A047;
        background: #E8F5E9;
      }
      .timer{
        color: #FDBC6E;
        background: #FFF8F0;
      }
      .question-tracker {
        color: #004D40;
        background: #E0F2F1;
      }
    `
  ]
})
export class ScoreTimerPanelComponent {
  @Input() score!: number;
  @Input() timeLeft!: number;
  @Input() currentQuestion!: number;
  @Input() noOfQuestions!: number;

  formatTime(seconds: number): string {
    if (seconds === Infinity) return '∞';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
