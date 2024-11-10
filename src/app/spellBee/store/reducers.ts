import { createReducer, on } from "@ngrx/store";
import { Word } from "../models/word";
import { Preference } from "../models/preference";
import { setPreferences, loadWordsSuccess, loadWordFailure, updatedWordAsCompleted } from './actions'
export interface SpellBeeState {
      preferences : Preference,
      words: Word[];
      error: string;
}
export const initialState: SpellBeeState = {
    preferences : {
      questionCount: 4,
      timeLimit: 5,
      selectedLevels: [],
      isUnlimitedTime: false
    },
    words: [],
    error: ''
};
  export const spellBeeReducer = createReducer(
  initialState,
  on(setPreferences, (state, { preferences }) => ({ ...state, preferences: preferences })),
  on(loadWordsSuccess, (state, { words }) => ({ ...state, words: words })),
  on(updatedWordAsCompleted, (state, {  index }) => {
    const updatedWords = state.words.map((w, i) => (i === index ? {
      completed : true, ...w
    } : w));
    return { ...state, words: updatedWords };
  }),
  on(loadWordFailure, (state, { error }) => ({ ...state, error: error })),
  );
