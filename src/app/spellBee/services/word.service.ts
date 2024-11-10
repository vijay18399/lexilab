import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference } from '../models/preference';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'https://dictionaryapp-44vf.onrender.com'
  // private apiUrl =  'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWordDetails(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/wordInfo/${word}`);
  }

  getRecommendations(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommendations/${word}`);
  }

  getRandomWord(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random`);
  }
  getWordfTheDay(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wordOfTheDay`);
  }
  getCEFRWords(level: string, page: number, pageSize: number): Observable<{ words: string[], totalWords: number }> {
    const params = new HttpParams()
      .set('level', level)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<{ words: string[], totalWords: number }>(`${this.apiUrl}/cefr`, { params });
  }
  getCEFRWordsByLevels(preference:Preference): Observable<{ words: string[], totalWords: number }> {
    const params = new HttpParams()
      .set('levels', preference.selectedLevels.join(','))
      .set('limit',preference.questionCount)
    return this.http.get<any>(`${this.apiUrl}/cefr-words`, { params });
  }

}
