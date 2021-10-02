import { Component } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';

  sources = ['mssql', 'mongo', 'mysql', 'postgre'];
  dbSource = 'mssql';

  constructor(private eventService: EventService) {}

  onChange(event: string) {
    this.dbSource = event;
    this.eventService.onDbSourceChange(this.dbSource);
  }
}
