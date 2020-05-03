import { Component } from '@angular/core';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz App';
  category = '';
  question = '';

  constructor(questionService: QuestionService) { 
    questionService.fetchPlanets((r)=>{
      r.results.forEach(element => {
        console.log(element);
        this.category = element.category;
        this.question = element.question;

      });
    });
  }
}
