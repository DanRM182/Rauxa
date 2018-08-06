import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

import { UserData } from '../UserData';

@Component({
  selector: 'app-searched-user',
  templateUrl: './searched-user.component.html',
  styleUrls: ['./searched-user.component.css']
})
export class SearchedUserComponent implements OnInit {
  @Input() user: UserData;
  @Input() newSearch: boolean = null;

  constructor(public http: Http) { }

  ngOnInit() { }

  notBlank(validate){
    console.log(validate);
    if(validate==null)
    return false;
    else
    return true;
  }
}
