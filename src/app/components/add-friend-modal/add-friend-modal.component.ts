import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable} from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Friend } from 'src/app/store/friend.model';
import { FriendState } from 'src/app/store/friend.reducer';
import { addFriend } from 'src/app/store/friend.actions';
@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.scss']
})
export class AddFriendModalComponent implements OnInit {
  group = this.fb.group({
    name: ['',Validators.required],
    weight: ['', Validators.required],
    age: ['',[Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')]],
    friendID: ['',Validators.required],
    id: [0]
  })
  friends$: Observable<Friend[]> | undefined
  id = 0
  constructor(
    private fb : FormBuilder, 
    private store: Store<FriendState>, 
    private data: DataService,
    public dialog: DialogRef<AddFriendModalComponent>
    ){ }

  ngOnInit(): void {
    this.friends$ = this.data.friends$
  } 

  createId(): void {
    this.friends$?.pipe(
      map((friends) => friends.length + 1),
    ).subscribe(id => this.id = id)
  }

  submitForm(): void{
    if (this.group.valid){
      let customer = new Friend()
      this.createId()
      customer.id = this.id
      customer = Object.assign(customer, this.group.value)
      this.store.dispatch(addFriend(customer))
      this.dialog.close();
    }
  }
}
