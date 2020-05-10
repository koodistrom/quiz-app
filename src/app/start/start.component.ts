import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Player} from '../player';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})


export class StartComponent implements OnInit {

  @Output() startEvent = new EventEmitter<boolean>();
  form = new FormGroup({
    name: new FormControl('Nancy', Validators.minLength(2)),
  });
  gameOptions = new FormGroup({difficulty: new FormControl('medium'), rounds: new FormControl(), category: new FormControl()});
  players: Player[] = [];
  startPhase;
  categories;
  questionService;
  constructor(questionService: QuestionService) {
    this.questionService = questionService;
    this.startPhase = true;
    this.getCategories();
    
  }
  get name(): any {
    return this.form.get('name');
  }

  getCategories(): void{
    this.questionService.fetchCategories((response)=>{
      console.log(response);
      this.categories = response.trivia_categories;
      this.categories.push({id:-1, name: 'random'});
    });
  }

  onSubmit(): void {
    this.players.push({points: 0, name: this.form.value.name});

  }

  start(): void{

    if(this.players.length>0 && this.gameOptions.value.rounds>0){
      this.startEvent.emit(false);
      
    }

  }



  ngOnInit(): void {
  }


}

