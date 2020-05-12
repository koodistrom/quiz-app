import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchQuestions(callBackFunction: (result: any) => void, category: string, difficulty: string): void {
  
    let params;
    if(category != "-1"){
      params ={amount: "1", category: category, difficulty: difficulty};
    }else{
      params = {amount: "1", difficulty: difficulty};
    }
    console.log(params);
    this.http.get(`https://opentdb.com/api.php`, {params: params}).subscribe(callBackFunction);
  }

  fetchCategories(callBackFunction: (result: any) => void): void {
    this.http.get(`https://opentdb.com/api_category.php`).subscribe(callBackFunction);
  }

}
