import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-title-history',
  templateUrl: './title-history.component.html',
  styleUrls: ['./title-history.component.scss']
})
export class TitleHistoryComponent implements OnInit {

  titleHistory: string[] = [];
  @Input() addTitleEventEmitter: EventEmitter<string> | undefined;

  constructor() {
  }

  ngOnInit(): void {
    if (this.addTitleEventEmitter === undefined)
      throw new Error('The addTitleEventEmitter should not be undefined.');

    this.addTitleEventEmitter.subscribe(title => {
      this.titleHistory.push(title);
    });
  }

  public removeTitleByName(titleName: string) {
    this.titleHistory = this.titleHistory.filter(currentTitle => currentTitle !== titleName);
  }

}
