import { createAction, props } from "@ngrx/store"
import { CartItem, Product } from "../practice/Three"
// create Actions First
export const addProduct = createAction('[product] addProduct',props<{ movieName: string }>())
// create Model For initialState
export  interface  ProductPageState {
  products : Product[]
  cartItems: CartItem []
}
// initialState definition
export const initialState = {
  products : [],
  cartItems: []
}
// create Reducer

// add Selectors
