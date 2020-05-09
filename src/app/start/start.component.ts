import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Player} from '../player';

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
  players: Player[] = [];
  startPhase;
  constructor() { 
    this.startPhase = true;
  }
  get name(): any {
    return this.form.get('name');
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.players.push({points: 0, name: this.form.value.name});
    console.log(this.players);
  }

  start(): void{
    console.log("ckidi")
    this.startEvent.emit(false);
  }



  ngOnInit(): void {
  }


}

