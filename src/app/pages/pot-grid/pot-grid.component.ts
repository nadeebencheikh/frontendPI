import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { PotService } from 'src/app/services/pot/pot.service';

@Component({
  selector: 'app-pot-grid',
  templateUrl: './pot-grid.component.html',
  styleUrls: ['./pot-grid.component.css']
})

export class PotGridComponent implements OnInit {
  constructor(private potService: PotService ,private cs:CookiesService  ){
    this.jwt=this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();}

  jwt : string;
  pots: any[] | undefined;
  id:number;


  ngOnInit(): void {
    this.potService.getpot(this.jwt).subscribe(res=>{
        this.pots=res.reverse();
          console.log(this.pots);
   });
  }
}
