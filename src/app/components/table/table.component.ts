import { Component, Input } from '@angular/core';
import { Friend } from 'src/app/store/friend.model';
import { DataService } from 'src/app/services/data.service';
import { TableHeaders } from 'src/app/app.constants';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() friends: Friend[] = [];
  displayedColumns = TableHeaders;
  selectedFriends?: Friend[];
  constructor(private data: DataService) { }

  getUserDetails(user: Friend) {
    if (user) {
      this.selectedFriends = [];
      this.selectedFriends = user.friendID.map((id: number) =>
        this.friends.find((f: Friend) => f.id == id) || {} as Friend
      )
      this.data.showSelectedFriends(this.selectedFriends);
    }
  }
}
