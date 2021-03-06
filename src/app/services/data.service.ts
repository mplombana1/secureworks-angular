import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '../store/friend.model';
import { selectFriend } from '../store/friend.selector';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  friends$: Observable<Friend[]> | undefined
  selectedFriendsBehaviorSubject = new BehaviorSubject<Friend[]>([]);
  selectedFriends$ = this.selectedFriendsBehaviorSubject.asObservable();
  
  constructor(private store: Store<Friend>) { }
  
  getFriends(): void {
   this.friends$ = this.store.pipe(select(selectFriend))
  }

  showSelectedFriends(friends: Friend[]): void {
    this.selectedFriendsBehaviorSubject.next(friends);
  }
}
