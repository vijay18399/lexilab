import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { loadWordsSuccess, loadWords } from './actions';
import { SpellBeeState } from './reducers';
import { selectPreferences } from './selectors';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { WordService } from '../services/word.service';

@Injectable()
export class SpellBeeEffects {

  constructor(private action$: Actions,
    private store: Store<SpellBeeState>,
    private wordService: WordService
  ){
  }
  loadWords$ =  createEffect(()=>
     this.action$.pipe(
      ofType(loadWords),
      withLatestFrom(this.store.select(selectPreferences)),
      mergeMap(([action, preference]) =>
        this.wordService.getCEFRWordsByLevels(preference).pipe(
          map((data: any) => loadWordsSuccess({ words: data.words })),
          catchError((error) => of(loadWordsFailure({ error: error.message })))
        )
      )
     )
    )



}
function loadWordsFailure(arg0: { error: any; }): any {
  throw new Error('Function not implemented.');
}

