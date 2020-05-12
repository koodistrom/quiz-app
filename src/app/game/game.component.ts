import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import {Answer} from '../answer';
import { Player } from '../player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

    category = '';
    question = '';
    answerOptions: Answer[] = [];
    correct = '';
    questionService;
    points: number = 0;
    answered: boolean;
    playerInTurn = 0;
    round = 1;
    gameOver = false;
    selectedCategory: string;
    @Input() gameOptions;
    @Input() players: Player[];
    constructor(questionService: QuestionService) {
      this.questionService = questionService;

  
    }

    ngOnInit() {

      this.selectedCategory = this.gameOptions.category;
      
      this.getQuestion();
    }
  
    nextQuestion(): void {

      this.answered = false;
      this.correct = '';

      if(this.playerInTurn === this.players.length-1){
        if(this.round<this.gameOptions.rounds){
          this.round++;
        }else{
          this.gameOver = true;
        }
      }
      this.getQuestion();
      this.playerInTurn = (this.playerInTurn + 1) % this.players.length;

    }

    getQuestion(): void {
      this.answerOptions = [];
      if(!this.gameOver){
        this.questionService.fetchQuestions((r) => {
          console.log(r);
          r.results.forEach(element => {
            console.log(element);
            this.category = this.decodeHTMLEntities(element.category);
            this.question = this.decodeHTMLEntities(element.question);
            this.answerOptions.push({right: true, text: this.decodeHTMLEntities(element.correct_answer)});
            element.incorrect_answers.forEach(e => {
              this.answerOptions.push({right: false, text: this.decodeHTMLEntities(e)});
            });
            this.shuffle(this.answerOptions);

  
          });
        },this.selectedCategory, this.gameOptions.difficulty);
      }
    }

    decodeHTMLEntities(text) {
      let textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      return textArea.value;
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
          console.log(this.playerInTurn );
          this.players[this.playerInTurn].points ++;
        }else{
          this.correct='Thats wrong!:(';
        }
        this.answered=true;
      }
    }
  
  }
