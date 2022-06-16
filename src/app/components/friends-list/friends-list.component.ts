import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Friend } from 'src/app/store/friend.model';
import { TableHeaders } from 'src/app/app.constants';
@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  selectedFriends? :Observable<Friend[]>;
  displayedColumns = TableHeaders;

  constructor(private data : DataService) { }
  
  ngOnInit(): void {
    this.getSelectedFriends()
  }
  
  getSelectedFriends(): void {
    this.selectedFriends = this.data.selectedFriends$
  }
}
