import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchQuestions(callBackFunction: (result: any) => void, category: string, difficulty: string): void {
    console.log(`https://opentdb.com/api.php?amount=1${category}&difficulty=${difficulty}`);
    this.http.get(`https://opentdb.com/api.php?amount=1${category}&difficulty=${difficulty}`).subscribe(callBackFunction);
  }

  fetchCategories(callBackFunction: (result: any) => void): void {
    this.http.get(`https://opentdb.com/api_category.php`).subscribe(callBackFunction);
  }

}
