// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
// Material Modules
import { MatInputModule }  from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
// NGRX
import { StoreModule } from '@ngrx/store';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { AddFriendModalComponent } from './components/add-friend-modal/add-friend-modal.component';
6
import {customerFeatureKey, reducer} from './store/friend.reducer';
@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent,
    TableComponent,
    HeaderComponent,
    AddFriendModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(customerFeatureKey, reducer),
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
