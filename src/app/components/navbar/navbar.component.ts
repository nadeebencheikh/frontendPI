import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private _router: Router, private UserService: UserService){}
 loggedin=false;

  ngOnInit(): void {
    this.loggedin=this.UserService.isLoggedInUser();
    console.log(this.loggedin+"--------------");
  }

}
