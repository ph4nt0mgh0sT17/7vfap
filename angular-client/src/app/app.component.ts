import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-client';

  addTitleEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  public addTitleToHistory() {
    this.addTitleEventEmitter.emit(this.title);
    this.title = '';
  }


}
