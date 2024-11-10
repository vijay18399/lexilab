import { Component, OnInit, OnDestroy } from '@angular/core';
import { Preference } from '../models/preference';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectError, selectWords } from '../store/selectors';
import { loadWords, setPreferences, updatedWordAsCompleted } from '../store/actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'spell-bee-game',
  template: `
  <!-- spell-bee-game.component.html -->
  <header class="header">
      <button mat-icon-button (click)="navigateHome()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <h1>Spell Bee Game</h1>
    </header>
  <div class="game-container" *ngIf="!loading && !gameEnded">
    <score-timer-panel  [noOfQuestions]="words.length" [currentQuestion]="currentIndex+1" [score]="score" [timeLeft]="timeLeft"></score-timer-panel>
    <spell-bee-word
      *ngIf="currentWord"
      [word]="currentWord"
      (onSuccess)="handleSuccess()"
      (onNext)="advanceWord()"
    ></spell-bee-word>
  </div>
   <score-board
   *ngIf="gameEnded"
   [score]="score"
   [totalWords]="words.length"
   [feedbackMessage]="getFeedbackMessage()"
   [words]="words"
   (newGame)="startNewGame()"
   (goHome)="navigateHome()"
   ></score-board>
   <loader  *ngIf="loading" color="#017561"></loader>

  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #F1F5F9;
      }
      .header {
        position: fixed;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        background: #01579E;
        color: #ffffff;
        z-index: 10;
        gap: 10px;
        height: 48px;
      }
      .header button {
        color : white;
      }
      .header h1 {
        font-size: 1rem;
        margin: 0;
      }
      .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.2rem;
        width: 640px;
      }
      score-board{
        padding: 1.2rem;
        width: 640px;
      }
      score-timer-panel{
        width:100%;
      }
    `
  ]
})
export class SpellBeeGameComponent implements OnInit, OnDestroy {
  preferences!: Preference;
  words: any[] = [];
  error$!: Observable<string>;
  loading = false;
  gameEnded = false;
  currentIndex = 0;
  score = 0;
  timeLeft = 0;
  timerInterval!: any;
  wordsSubscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadPreferences();
    this.initializeGame();
  }

  private loadPreferences() {
    this.route.queryParams.subscribe(params => {
      this.preferences = {
        questionCount: +params['questionCount'] || 0,
        timeLimit: +params['timeLimit'] || 0,
        selectedLevels: params['levels']?.split(',') || [],
        isUnlimitedTime: !params['timeLimit']
      };
      this.store.dispatch(setPreferences({ preferences: this.preferences }));
    });
  }

  private initializeGame() {
    this.store.dispatch(loadWords());
    this.loading = true;
    this.gameEnded = false;
    this.score = 0;
    this.currentIndex = 0;
    this.wordsSubscription = this.store.pipe(select(selectWords)).subscribe(words => {
      if (words.length > 0) {
        this.words = words;
        this.loading = false;
        this.startTimer();
      }
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  get currentWord() {
    return this.words[this.currentIndex];
  }

  handleSuccess() {
    this.score++;
    this.store.dispatch(updatedWordAsCompleted({
      index : this.currentIndex
    }));
    if(this.currentIndex == this.words.length-1){
      this.endGame();
    }
  }

  skipWord() {
    this.advanceWord();
  }

  advanceWord() {
    if (this.preferences.questionCount && this.currentIndex + 1 >= this.preferences.questionCount) {
      this.endGame();
      return;
    }

    this.currentIndex++;
    if (this.currentIndex >= this.words.length) {
      this.endGame();
      return;
    }


  }

  private startTimer() {
    this.timeLeft = this.preferences.isUnlimitedTime ? Infinity : this.preferences.timeLimit * 60;
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0 && this.timeLeft !== Infinity) {
        this.timeLeft--;
      } else {
        this.skipWord();
      }
    }, 1000);
  }

  private resetTimer() {
    clearInterval(this.timerInterval);
    this.startTimer();
  }

  formatTime(seconds: number): string {
    if (seconds === Infinity) return '∞';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  private endGame() {
    clearInterval(this.timerInterval);
    this.gameEnded = true;
  }

  startNewGame() {
    this.initializeGame();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    this.wordsSubscription?.unsubscribe();
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  getFeedbackMessage(): string {
    const percentage = (this.score / this.words.length) * 100;
    if (percentage >= 70) return "You did great";
    if (percentage >= 50) return "Well done bravo";
    return "Keep Practicing";
  }
}
