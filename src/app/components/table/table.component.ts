import { Component, OnInit } from '@angular/core';
import { FriendsList } from '../friends-list/friends-list.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'weight', 'age', 'friends'];
  friends: FriendsList[] = [
    {id: 1, name: "Curtis Mcmahon", weight: 200, age: 34, friendID: [2]},
    {id: 2, name: "John Doe", weight: 195, age: 34, friendID: [3,4]},
    {id: 3, name: "Reo Bernard", weight: 200, age: 34, friendID: [4,3]},
    {id: 4, name: "Chiara Corbett", weight: 200, age: 34, friendID: [1,3]},
    {id: 5, name: "Mikolaj Savage", weight: 200, age: 34, friendID: [3,4]},
    {id: 6, name: "Aliya Roche", weight: 200, age: 34, friendID: [4,5]},
  ]
  dataSource = this.friends;
  constructor() { }

  ngOnInit(): void {
  }

  getUserDetails(user: FriendsList){
    console.log(user)
  }
}
