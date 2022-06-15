import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { filter } from 'rxjs/operators'
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
  })
  friends$: Observable<Friend[]> | undefined
  constructor(
    private fb : FormBuilder, 
    private store: Store<FriendState>, 
    private data: DataService,
    public dialog: DialogRef<AddFriendModalComponent>
    )
    { }

  ngOnInit(): void {
    this.friends$ = this.data.friends$
  }

  submitForm(): void{
    if (this.group.valid){
      let customer = new Friend()
      customer = Object.assign(customer, this.group.value)
      this.store.dispatch(addFriend(customer))
      console.log('🚀 : customer', customer)
      this.dialog.close();
    }
  }
}
