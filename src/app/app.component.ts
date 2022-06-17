import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from './services/data.service';
import { Friend } from './store/friend.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private data: DataService) {}
  destroy$ = new Subject<boolean>();
  friends: Friend[] = [];

  ngOnInit(): void {
    this.data.getFriends();
    this.data.friends$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.friends = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
