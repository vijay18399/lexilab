import { Router } from "@angular/router";
import { PreferenceDialogComponent } from "./spellBee/components/preference-dialog.component";
import { Preference } from "./spellBee/models/preference";
import { MatDialog } from "@angular/material/dialog";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: 'home-page',
  template: `
    <div class="home-container">
      <h1 class="title">Welcome to LexiLab!</h1>
      <p class="description">Explore tools to improve your language skills.</p>
      <div class="tools-container">
        <mat-card class="tool-card" (click)="navigateTo('/cefr')">
          <img src="pronounciation.png" alt="Pronunciation Icon" class="tool-icon" />
          <div class="info">
            <h3>Pronunciation</h3>
            <p>Practice words by level: A1 to C2</p>
          </div>
        </mat-card>

        <mat-card class="tool-card" (click)="onSpellBee()">
          <img src="spelling-bee.png" alt="Spell Word Icon" class="tool-icon" />
          <div class="info">
            <h3>Spell Bee</h3>
            <p>Test your spelling skills with new words!</p>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 20px;
    }
    .title {
      font-size: 2rem;
      color: #333;
      margin-bottom: 8px;
    }
    .description {
      font-size: 1rem;
      color: #555;
      margin-bottom: 32px;
    }
    .tools-container {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    .tool-card {
      max-width : 280px;
      height: 108px;
      width: 100%;
      padding: 20px;
      background: #ffffff;
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .tool-icon {
      width: 60px;
      height: auto;
      border-radius: 8px;
      padding: 10px;
      background: #F5F5F5;
      margin-right: 12px;
    }
    .info h3 {
      font-size: 1.1rem;
      line-height: 20px;
      margin: 8px 0;
      color: #444;
    }
    .info p {
      font-size: 0.8rem;
      line-height: 16px;
      color: #616161;
    }
  `]
})
export class HomePageComponent {
  constructor(private router: Router, private store: Store) {}

  readonly dialog = inject(MatDialog);
  isLoading = false;

  getSpellBeeUrl(preferences: Preference): Record<string, string> {
    const queryParams: Record<string, string> = {};

    if (preferences.questionCount) {
      queryParams['questionCount'] = preferences.questionCount.toString();
    }
    if (!preferences.isUnlimitedTime && preferences.timeLimit) {
      queryParams['timeLimit'] = preferences.timeLimit.toString();
    }
    if (preferences.selectedLevels.length) {
      queryParams['levels'] = preferences.selectedLevels.join(',');
    }

    return queryParams;
  }

  onSpellBee() {
    this.isLoading = true;
    const dialogRef = this.dialog.open(PreferenceDialogComponent);

    dialogRef.componentInstance.preferencesSelected.subscribe((preferences: Preference) => {
      const queryParams = this.getSpellBeeUrl(preferences);
      this.navigateTo('spell-bee', queryParams);
      this.isLoading = false;  // Set to false after navigation
    });
  }

  // Improved navigateTo function
  navigateTo(path: string, queryParams: Record<string, string> = {}) {
    this.router.navigate([path], { queryParams })
      .then(() => this.isLoading = false)  // Stop loading indicator after successful navigation
      .catch(() => this.isLoading = false); // Ensure loading is turned off if navigation fails
  }

}
