import { createAction, props } from '@ngrx/store'
import { Word } from '../models/word';
import { Preference } from '../models/preference';
export const setPreferences = createAction('[Preference] Load Preference',props<{ preferences: Preference }>());
export const loadWords = createAction('[Words] Load Words');
export const updatedWordAsCompleted = createAction('[Words] Update Word as Completed',  props<{  index: number }>());
export const loadWordsSuccess = createAction('[Words] Load Words Success', props<{ words: Word[] }>());
export const loadWordFailure = createAction('[Words] Load Words Failure', props<{ error: string }>());
export const clearWords = createAction('[Words] Clear Words');


