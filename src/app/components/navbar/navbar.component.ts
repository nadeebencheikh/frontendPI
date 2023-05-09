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
    //window.location.reload();
    this.loggedin=this.UserService.isLoggedInUser();
    console.log(this.loggedin+"--------------");

  }
profile(){
  console.log("peeeeeeeeeee")
  this._router.navigate(['/profile']);

}
}
