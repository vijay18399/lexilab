import { SpellBeeState } from "./reducers";
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectSpellBeeState = createFeatureSelector<SpellBeeState>('spellBee');
export const selectPreferences = createSelector(selectSpellBeeState,
  (state: SpellBeeState) => state.preferences
);
export const selectWords = createSelector(selectSpellBeeState,
    (state:SpellBeeState) => state.words
)
export const selectError = createSelector(selectSpellBeeState,
  (state:SpellBeeState) => state.error
)
