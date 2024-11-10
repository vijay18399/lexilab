import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
// create Actions
export const increment = createAction("[counter] increment")
export const decrement = createAction("[counter] decrement")
export const reset = createAction("[counter] reset")
// interface for State
interface Counter{
  count : number
}
// initialState
const initialState : Counter = {
  count : 0
}
// reducer
export const counterReducer = createReducer(initialState,
on(increment, (state)=>{
 return {
  ...state,
  count : state.count+1
 }
}),
on(decrement, (state)=>{
  return {
    ...state,
    count : state.count-1
  }
}),
on(reset, (state)=>{
  return {
    ...state,
    count : 0
  }
 })
)
// regiter in module
// StoreModule.forRoot({
//   counter : counterReducer
//  }),
// selection
const selectCounterState = createFeatureSelector<Counter>("counter")
export const selectCount = createSelector(selectCounterState,(state)=> state.count)
