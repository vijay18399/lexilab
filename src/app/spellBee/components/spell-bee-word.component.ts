import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Renderer2, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Word } from '../models/word';
import confetti from 'canvas-confetti';
import { ConfettiService } from '../services/confetti.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'spell-bee-word',
  template: `
    <mat-card>
      <div class="audio-control">
        <button mat-stroked-button (click)="playVoice()">
          <mat-icon>volume_up</mat-icon>
          Listen to the word
        </button>
      </div>
      <div class="form">
        <div *ngIf="word.completed" class="completed">
          <img src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png">
          <span>You spelled it right!</span>
        </div>
        <ng-otp-input *ngIf="!word.completed && showOtpInput" (onInputChange)="onInputChange($event)" [config]="{length: word.word.length}"></ng-otp-input>
        <div class="submit-button">
          <button *ngIf="!word.completed" mat-raised-button (click)="onSubmit()">
            Submit
          </button>
          <button *ngIf="word.completed" mat-raised-button (click)="onNextWord()">
            Next Word
          </button>

        </div>
      </div>
    </mat-card>
    <button class="skip" *ngIf="!word.completed"   mat-stroked-button color="warn" (click)="onSkipWord()">
            Skip
    </button>
  `,
  styles: [`
    :host {
      margin: 20px 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
   }
    mat-card {
      background: #ffffff;
      display: flex;
      flex-direction: column;
      padding: 1.5rem 0.4rem;
      align-items: center;
      border-radius: 10px;
      width: 100%;
    }
    .audio-control {
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
    }
    .audio-control button {
      color: #01579E;
    }
    .skip{
      background-color: #ffffff;
    }
    .form button {
      color: #ffffff;
      background-color: #01579E;
    }
    .submit-button {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
    }
    .completed {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        color: #3EB655;
        font-weight: 600;
      }
    }
  `]
})
export class SpellBeeWordComponent implements OnChanges {
  @ViewChildren('letterInput') letterInputs!: QueryList<ElementRef>;
  @Input() word!: Word;
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();
  @Output() onSkip = new EventEmitter<void>(); // New output event for skip
  private toastService = inject(HotToastService);

  lettersForm!: FormGroup;
  errorMessage = '';
  activeIndex: number | null | undefined;
  audio!: HTMLAudioElement;
  userInput: string = '';
  showOtpInput: boolean = true;

  constructor(private renderer: Renderer2, private confettiService: ConfettiService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.init();
  }

  init() {
    this.audio = new Audio(this.word.voice);
    this.showOtpInput = false;
    setTimeout(() => (this.showOtpInput = true), 0);
  }

  onNextWord() {
    this.onNext.emit();
  }

  onSkipWord() {
    this.onNext.emit();
  }

  onInputChange($event: string) {
    this.userInput = $event;
  }

  onSubmit() {
    if (this.userInput === this.word.word.toLowerCase()) {
      this.confettiService.shootConfetti();
      this.onSuccess.emit();
      this.errorMessage = '';
    } else {
      const isFullyFilled = this.userInput.length === this.word.word.length;
      const message = isFullyFilled
        ? 'Incorrect spelling, please try again!'
        : 'Please complete the word first.';
      this.toastService.error(message);
    }
  }

  playVoice() {
    this.audio.play().catch(err => {
      console.error('Error playing audio:', err);
    });
  }
}
