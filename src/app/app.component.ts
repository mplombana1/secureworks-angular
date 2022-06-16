import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Friend } from './store/friend.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private data: DataService) {}
  title = 'secureworks-angular';
  friends: Friend[] = [];
  dummyData = [
    {id: 1, value: 10, region: 'USA'},
    {id: 2, value: 11, region: 'CANADA'},
    {id: 3, value: 12, region: 'MEXICO'},
    {id: 4, value: 6, region: 'BRAZIL'},
  ]
  ngOnInit(): void {
    this.data.getFriends();
    this.data.friends$?.subscribe((res) => (this.friends = res));
  }

  updateValues(){
    this.dummyData.push({id: 5, value: 10, region: 'OTHER'})
    console.log(this.dummyData)
  }

}
