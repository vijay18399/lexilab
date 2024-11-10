import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";


// create Actions First
export const addMovie = createAction('[One] addMovie',props<{ movieName: string }>())
export const removeMovie = createAction('[One] removeMovie',props<{ index: number }>())

export interface FavouriteState {
  movies : string[]
}
export const initialState : FavouriteState = {
   movies : []
}

export const movieReducer =   createReducer(initialState,
  on(addMovie,(state,{ movieName })=>{
      return {
        ...state,
        movies : [...state.movies, movieName]
      }
  }),
  on(removeMovie,(state,{index})=>{
    return {
      ...state,
      movies : state.movies.filter((item,arrIndex)=>arrIndex != index)
    }
  })
);


export const selectFavouriteState =  createFeatureSelector<FavouriteState>('One')
export const selectMovies = createSelector(
  selectFavouriteState,
  (state: FavouriteState) => state.movies
);
