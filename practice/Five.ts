import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  template: `
    <div>
      <h3>{{ question.text }}</h3>
      <ul>
        <li *ngFor="let option of question.options">
          <button (click)="selectAnswer(option)">{{ option }}</button>
        </li>
      </ul>
      <p *ngIf="selectedAnswer !== null">
        Your answer is {{ selectedAnswer ? 'Correct' : 'Incorrect' }}
      </p>
    </div>
  `,
  styles: []
})
export class Five {
  question = {
    text: 'What is the capital of France?',
    options: ['Paris', 'Rome', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris'
  };
  selectedAnswer: boolean | null = null;

  selectAnswer(option: string) {
    this.selectedAnswer = option === this.question.correctAnswer;
  }
}
