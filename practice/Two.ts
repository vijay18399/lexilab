import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset, selectCount } from '../ngrx/Two';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count$ | async }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
      <h3>Action Log</h3>

    </div>
  `,
  styles: []
})
export class Two {
  count = 0;
  count$: any;
  constructor(private store: Store){
    this.count$ = this.store.select(selectCount)
  }
  increment() {
    // this.count++;
    this.store.dispatch(increment())
  }

  decrement() {
    // this.count--;
    this.store.dispatch(decrement())
  }

  reset() {
    // this.count = 0;
    this.store.dispatch(reset())

  }
}
