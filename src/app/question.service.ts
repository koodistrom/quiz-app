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


  fetchPlanets(callBackFunction: (result: any) => void): void {
    this.http.get('https://opentdb.com/api.php?amount=1&difficulty=medium').subscribe(callBackFunction);
  }



}
