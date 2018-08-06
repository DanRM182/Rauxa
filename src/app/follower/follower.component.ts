import { Component, OnInit, Input } from '@angular/core';
import { UserData } from '../UserData';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  @Input() follower: UserData;
  constructor() { }

  ngOnInit() {
  }

}
