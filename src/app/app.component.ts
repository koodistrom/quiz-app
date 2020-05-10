import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import {Answer} from './answer';
import {Player} from './player';
import { StartComponent } from './start/start.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  @ViewChild(StartComponent) start;

  title = 'Quiz App';
  startPhase = true;
  players: Player[];
  gameOptions;
  ngAfterViewInit(): void {
    this.players = this.start.players;
    
  }

  receiveStart($event: boolean) {
    this.gameOptions = this.start.gameOptions.value;
    this.startPhase = $event;
    
  }


}
