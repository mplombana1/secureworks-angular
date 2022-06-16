import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFriendModalComponent } from '../add-friend-modal/add-friend-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddFriendModalComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
