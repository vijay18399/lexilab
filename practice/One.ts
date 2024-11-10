import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addMovie, removeMovie, selectMovies } from '../ngrx/One';

@Component({
  selector: 'app-movie-list',
  template: `
    <div>
      <input [(ngModel)]="newMovie" placeholder="Add a new movie" />
      <button (click)="addMovie()">Add Movie</button>
      <h3>Favorite Movies</h3>
      <ul>
        <li *ngFor="let movie of fmovies$ | async ; let i = index">
          {{ movie }}
          <button (click)="removeMovie(i)">Remove</button>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class  One{
  newMovie = '';
  favoriteMovies:any = [];
  fmovies$!: Observable<string[]>;
  constructor(private store: Store) {
    this.fmovies$ = this.store.select(selectMovies);
  }
  addMovie() {
    if (this.newMovie.trim()) {
      this.store.dispatch(addMovie({ movieName : this.newMovie }));
      this.newMovie = '';
    }
  }

  removeMovie(id: number) {
    this.store.dispatch(removeMovie({ index : id }));

  }
}
