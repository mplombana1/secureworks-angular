import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Friend } from 'src/app/store/friend.model';
import { FriendState } from 'src/app/store/friend.reducer';
import { selectFriend } from 'src/app/store/friend.selector';
import { FriendsList } from '../friends-list/friends-list.model';
import { addFriend } from 'src/app/store/friend.actions';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'weight', 'age', 'friends'];
  customers: Friend[] = []
  destroy$ = new Subject();
  constructor(private data: DataService) {}
  
  ngOnInit(): void {  
    this.data.friends$?.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res =>this.customers = res)
  }

  getUserDetails(user: FriendsList){
    console.log(user)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
