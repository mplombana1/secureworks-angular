import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendsList } from './friends-list.model';
@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  friendsList: FriendsList[] = [];
  id?: number;
  group = this.fb.group({
    name: ['', Validators.required],
    weight: ['', Validators.required],
    age: ['',[Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')]],
    friendID: ['',Validators.required],
  })

  friends: FriendsList[] = [
    {id: 1, name: "Curtis Mcmahon", weight: 200, age: 34, friendID: [2]},
    {id: 2, name: "John Doe", weight: 195, age: 34, friendID: [3,4]},
    {id: 3, name: "Reo Bernard", weight: 200, age: 34, friendID: [4,3]},
    {id: 4, name: "Chiara Corbett", weight: 200, age: 34, friendID: [1,3]},
    {id: 5, name: "Mikolaj Savage", weight: 200, age: 34, friendID: [3,4]},
    {id: 6, name: "Aliya Roche", weight: 200, age: 34, friendID: [4,5]},
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.group.valueChanges.subscribe(res => {
      console.log('🚀 : res', this.group.value)
    })
  }

  submitForm(): void{
    if (this.group.valid){
      const lastItemIndex = this.friends.length -1;
      const generateId = this.friends[lastItemIndex].id++
      this.id = generateId;
      const json = JSON.stringify(this.group.value);
      const value = JSON.parse(json)
      this.friends.push(value)
    }
  }

}