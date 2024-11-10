import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { HomePageComponent } from './home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceDialogComponent } from './spellBee/components/preference-dialog.component';
import { PushButton } from './spellBee/components/push-button.component';
import { SpellBeeGameComponent } from './spellBee/components/spell-bee-game.component';
import { SpellBeeWordComponent } from './spellBee/components/spell-bee-word.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { spellBeeReducer } from './spellBee/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { SpellBeeEffects } from './spellBee/store/effects';
import { movieReducer } from '../../ngrx/One';
import { counterReducer } from '../../ngrx/Two';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgOtpInputModule } from  'ng-otp-input';
import { Loader } from './spellBee/components/loader';
import { ScoreTimerPanelComponent } from './spellBee/components/score-timer-panel.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ScoreBoardComponent } from './spellBee/components/score-board.component';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SpellBeeGameComponent,
    SpellBeeWordComponent,
    PreferenceDialogComponent,
    PushButton,
    Loader,
    ScoreBoardComponent,
    ScoreTimerPanelComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    StoreModule.forRoot({
     spellBee: spellBeeReducer
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: false}),
    EffectsModule.forRoot([SpellBeeEffects]),
    NgOtpInputModule,
    ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    provideAnimationsAsync(),
    provideHotToastConfig()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
