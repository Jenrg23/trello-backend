import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrelloComponent } from './trello/trello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrelloComponent],
  templateUrl: './app.html',
})
export class App {}
