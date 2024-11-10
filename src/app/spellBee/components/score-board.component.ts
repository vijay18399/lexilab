import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../models/word';

@Component({
  selector: 'score-board',
  template: `
    <div class="scorecard">
      <div class="final-score-badge">
        <circle-progress
          [percent]="successPercentage"
          [radius]="75"
          [showZeroOuterStroke]="false"
          [showUnits]="false"
          [showSubtitle]="false"
          [outerStrokeWidth]="16"
          [innerStrokeWidth]="8"
          [outerStrokeColor]="outerStrokeColor"
          [innerStrokeColor]="innerStrokeColor"
          [animation]="true"
          [animationDuration]="300"
          [title]="score + ' / ' + totalWords"
        ></circle-progress>
        <div class="feedback">{{ feedbackMessage }}</div>
        <ul class="words-list">
          <li *ngFor="let word of words" [class.completed]="word.completed" [class.failed]="!word.completed">
            {{ word.word }}
            <i *ngIf="word.completed" class="fa-solid fa-circle-check success"></i>
            <i *ngIf="!word.completed" class="fa-solid fa-circle-xmark fail"></i>
          </li>
        </ul>
        <button mat-raised-button (click)="newGame.emit()">New Game</button>
      </div>
    </div>
  `,
  styles: [
    `
      .scorecard {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        text-align: center;
      }
      .progress-spinner {
        margin-bottom: 1rem;
      }
      .final-score-badge {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        background: rgb(255, 255, 255);
        border-radius: 50px;
        align-items: center;
        padding: 14px 0px;
      }
      .score {
        width: 70px;
        height: 34px;
        background: #e8f5e9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        border: 1px solid #1b5e20;
        border-radius: 5px;
        font-weight: 600;
      }
      .words-list {
        display: flex;
        gap: 10px;
        padding: 10px;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        flex-wrap: wrap;
        justify-content: center;
      }
      .words-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        text-transform: lowercase;
        color: #424242;
        width: max-content;
        gap: 10px;
      }
      .words-list li.completed {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      .words-list li.failed {
        background-color: #ffebee;
        color: #c62828;
      }
      .words-list i.success {
        color: #558b2f;
      }
      .words-list i.fail {
        color: #c62828;
      }
      button {
        background: #01579b !important;
        color: white !important;
      }
    `
  ]
})
export class ScoreBoardComponent {
  @Input() score!: number;
  @Input() totalWords!: number;
  @Input() feedbackMessage!: string;
  @Input() words: Word[] = [];
  @Output() newGame = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();

  get successPercentage(): number {
    return (this.words.filter(word => word.completed).length / this.totalWords) * 100;
  }

  get outerStrokeColor(): string {
    return this.successPercentage >= 80 ? '#78C000' : this.successPercentage >= 50 ? '#FFC107' : '#D32F2F';
  }

  get innerStrokeColor(): string {
    return this.successPercentage >= 80 ? '#C7E596' : this.successPercentage >= 50 ? '#FFECB3' : '#FFCDD2';
  }
}
