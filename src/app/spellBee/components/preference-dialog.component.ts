import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Preference } from '../models/preference';

@Component({
  selector: 'preference-dialog',
  template: `
    <div class="dialog-container">
      <button class="close-button" (click)="closeDialog()">×</button>
      <form [formGroup]="preferenceForm" (ngSubmit)="onSubmit()" class="container">
        <div class="input-field">
          <label for="question-slider" class="slider-label">
            Number of Questions
          </label>
          <div class="slider-container">
            <mat-slider id="question-slider" min="4" max="10" step="1"
              [disabled]="preferenceForm.get('isUnlimitedQuestions')?.value">
              <input formControlName="questionCount" matSliderThumb>
            </mat-slider>
            <span>{{ preferenceForm.get('isUnlimitedQuestions')?.value ? '∞' : preferenceForm.get('questionCount')?.value }}</span>
          </div>
        </div>
        <div class="input-field">
          <label for="time-slider" class="slider-label">
            Time (minutes)
            <mat-checkbox formControlName="isUnlimitedTime">Unlimited</mat-checkbox>
          </label>
          <div class="slider-container">
            <mat-slider id="time-slider" min="1" max="10" step="1"
              [disabled]="preferenceForm.get('isUnlimitedTime')?.value">
              <input formControlName="timeLimit" matSliderThumb>
            </mat-slider>
            <span>{{ preferenceForm.get('isUnlimitedTime')?.value ? '∞' : preferenceForm.get('timeLimit')?.value }}</span>
          </div>
        </div>
        <div class="input-field">
          <label class="slider-label">CEFR Levels</label>
          <div class="card-container">
            <mat-card *ngFor="let level of cefrLevels" (click)="toggleLevel(level)"
              [class.active]="preferenceForm.get('selectedLevels')?.value?.includes(level)"
              class="category-box"
              [ngClass]="level.toLowerCase()">{{ level }}
            </mat-card>
          </div>
        </div>
        <button type="submit" mat-raised-button> New Game</button>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      position: relative;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .close-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: transparent;
      border: none;
      font-size: 2rem;
      cursor: pointer;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .input-field {
      margin-bottom: 1.5rem;
      width: 100%;
    }
    .slider-label {
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .slider-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    mat-slider {
      width: 100%;
    }
    .card-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .category-box {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .active {
        color: white;
        &.a1 { background-color: #ef5350; }
        &.a2 { background-color: #ffb74d; }
        &.b1 { background-color: #66bb6a; }
        &.b2 { background-color: #42a5f5; }
        &.c1 { background-color: #7e57c2; }
        &.c2 { background-color: #ff7043; }
      }
  `]
})
export class PreferenceDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<PreferenceDialogComponent>
  ) {}
  @Output() preferencesSelected = new EventEmitter<Preference>();
  cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  preferenceForm = new FormGroup({
    questionCount: new FormControl(4),
    timeLimit: new FormControl(5),
    selectedLevels: new FormControl(this.cefrLevels),
    isUnlimitedTime: new FormControl(false),
  });

  toggleLevel(level: string) {
    const currentSelection = this.preferenceForm.get('selectedLevels')?.value || [];
    if (currentSelection.includes(level)) {
      if (currentSelection.length > 1) {
        this.preferenceForm.get('selectedLevels')?.setValue(currentSelection.filter(item => item !== level));
      }
    } else {
      this.preferenceForm.get('selectedLevels')?.setValue([...currentSelection, level]);
    }
  }

  onSubmit() {
    const formValue = this.preferenceForm.value;
    const preferences: Preference = {
      questionCount: formValue.questionCount ?? 4, // Provide a default if null or undefined
      timeLimit: formValue.timeLimit ?? 5,
      selectedLevels: formValue.selectedLevels ?? this.cefrLevels,
      isUnlimitedTime: formValue.isUnlimitedTime ?? false
    };
    this.preferencesSelected.emit(preferences);
    this.closeDialog();
  }

  closeDialog() {
    console.log("Dialog closed");
    this.dialogRef.close();  }
}
