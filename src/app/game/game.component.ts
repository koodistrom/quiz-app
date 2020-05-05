import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import {Answer} from '../answer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

    category = '';
    question = '';
    answerOptions: Answer[] = [];
    correct = '';
    questionService;
    points: number = 0;
    answered: boolean;
  
    constructor(questionService: QuestionService) {
      this.questionService = questionService;
      this.nextQuestion();
  
    }
  
    nextQuestion(){
      this.answerOptions = [];
      this.questionService.fetchQuestions((r) => {
        r.results.forEach(element => {
          console.log(element);
          this.category = element.category;
          this.question = element.question;
          this.answerOptions.push({right: true, text: element.correct_answer});
          element.incorrect_answers.forEach(e => {
            this.answerOptions.push({right: false, text: e});
          });
          this.shuffle(this.answerOptions);
          this.answered = false;
          this.correct = '';
        });
      });
    }
  
    shuffle(array: any[]) {
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
  
    public select(event, answer) {
      if(!this.answered){
  
        if(answer.right){
          this.correct='Thats correct!';
          this.points ++;
        }else{
          this.correct='Thats wrong!:(';
        }
        this.answered=true;
      }
    }
  
  }
