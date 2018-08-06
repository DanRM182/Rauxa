import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { UserData } from '../UserData';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css']
})
export class FollowersListComponent implements OnInit {
  @Input() moreFollowers: boolean;
  @Input() newSearch: boolean = null;
  @Input() user: UserData;
  @Output() change: EventEmitter<UserData> = new EventEmitter<UserData>();
  nxtPage: number = 1;
  followers: Array<UserData> = new Array<UserData>();

  constructor(public http: Http) { }

  ngOnInit() {
    this.followers.length = 0;
    this.searchFollowers();
  }

  addFollowers() {
    this.newSearch = false;
    this.searchFollowers();
  }
  searchFollowers() {
    if (this.newSearch) {
      this.followers.length = 0;
      this.nxtPage = 1;
    }
    console.log('https://api.github.com/users/' + this.user.login + '/followers?per_page=10&page=' + this.nxtPage);
    this.http.get('https://api.github.com/users/' + this.user.login + '/followers?per_page=10&page=' + this.nxtPage)
      .pipe(map(r => r.json()))
      .subscribe(data => {
        if (Object.keys(data).length > 0) {
          for (var i = 0; i < Object.keys(data).length; i++) {
            let aux: UserData = data[i];
            this.followers.push(aux);
          }
          if (Object.keys(data).length == 10) {
            this.moreFollowers = true;
            this.nxtPage += 1;
          } else {
            this.nxtPage = 1;
            this.moreFollowers = false;
          }
        } else {
          this.nxtPage = 1;
          this.moreFollowers = false;
        }
      }, err => {
        console.log('Error ' + err);
      });
  }

  seeFollower(follower) {
    this.change.emit(follower);
    console.log(follower);
  }
}
