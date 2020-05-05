import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})


export class StartComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('Nancy', Validators.minLength(2)),
  });
  players: Player[] =[];
  constructor() { }
  get name(): any {
    return this.form.get('name');
  }

  onSubmit(): void {
    console.log(this.form.value);  
    this.players.push({points: 0, name: this.form.value.name});
    console.log(this.players);
  }



  ngOnInit(): void {
  }


}

interface Player{points:number, name}
