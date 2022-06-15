import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService) {}
  title = 'secureworks-angular';

  ngOnInit(): void {
    this.data.getFriends()
  }
}
