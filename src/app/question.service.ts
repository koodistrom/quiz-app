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


  fetchQuestions(callBackFunction: (result: any) => void, difficulty: string): void {
    this.http.get(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`).subscribe(callBackFunction);
  }



}
