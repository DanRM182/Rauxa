import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchedUserComponent } from './searched-user/searched-user.component';
import { FollowerComponent } from './follower/follower.component';
import { FollowersListComponent } from './followers-list/followers-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchedUserComponent,
    FollowerComponent,
    FollowersListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
