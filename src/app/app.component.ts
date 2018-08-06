import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { FollowersListComponent } from './followers-list/followers-list.component';
import { UserData } from './UserData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userExist: boolean = null;
  inSearch: boolean = false;
  user: UserData = null;
  newSearch: boolean = null;
  seeFollower: boolean = false;
  follower: UserData = null;
  nxtPage: number = 1;
  moreFollowers: boolean = true;
  @ViewChild(FollowersListComponent) child: FollowersListComponent;

  constructor(public http: Http) {  }

  ngOnInit() {
  }

  onEnter(value: string) {
    this.seeFollower = false;
    if (value != ''){
      this.getData(value);
      this.newSearch = true;
    } else {
      this.newSearch = false;
      this.inSearch = false;
    }

  }

  getData(value: string) {
    this.inSearch = true;
    this.http.get('https://api.github.com/users/' + value)
      .pipe(map(r => r.json()))
      .subscribe(data => {
        this.user = null;
        this.userExist = true;
        this.user = data;
        this.child.user = data;
        this.child.newSearch = this.newSearch;
        this.child.searchFollowers();
      }, err => {
        this.user = null;
        this.userExist = false;
        console.log('Error ' + err);
      });
  }

  expandFollower(follower){
    this.http.get('https://api.github.com/users/' + follower.login)
    .pipe(map(r => r.json()))
    .subscribe(data => {
      this.follower = data;
      this.seeFollower = true;
    }, err => {
      console.log('Error ' + err);
    });
  }
}
