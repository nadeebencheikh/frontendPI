import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { PotService } from 'src/app/services/pot/pot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    this.potService.gettop10(this.jwt).subscribe(res=>{
      this.users=res.reverse();
      console.log(this.users);


 });
  }
  constructor(private potService: PotService ,private cs:CookiesService  ){
    this.jwt=this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();}

  jwt : string;
  users!: any[];
    id!:any;
}
