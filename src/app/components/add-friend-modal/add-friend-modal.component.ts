import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FriendsList } from '../friends-list/friends-list.model';
@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.scss']
})
export class AddFriendModalComponent implements OnInit {
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
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {}

  submitForm(): void{
    console.log(this.group.value, 'form values')
  }
}
