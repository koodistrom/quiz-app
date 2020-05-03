import { Component } from '@angular/core';
import { QuestionService } from './question.service';
import {Answer} from './answer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz App';
  category = '';
  question = '';
  answerOptions: Answer[] = [];

  constructor(questionService: QuestionService) {
    questionService.fetchQuestions((r) => {
      r.results.forEach(element => {
        console.log(element);
        this.category = element.category;
        this.question = element.question;
        this.answerOptions.push({right: true, text: element.correct_answer});
        element.incorrect_answers.forEach(e => {
          this.answerOptions.push({right: false, text: e});
        });
        this.shuffle(this.answerOptions);

      });
    });
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

}
