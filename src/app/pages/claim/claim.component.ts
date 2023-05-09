import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'src/app/services/claim/claim.service';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent  implements OnInit{
  constructor(private claimService: ClaimService,private cs:CookiesService){
    this.jwt=this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();}
    jwt : string;
    id:number;
    show = false;
    addformc = new FormGroup({
      reference: new FormControl('', [Validators.required,Validators.minLength(4)]),
      claim: new FormControl('', [Validators.required,Validators.minLength(4)])


  })
    ngOnInit(): void {


     };
     addclaim() {
      let data:any=(this.addformc.value);
      data['user'] = { idUser: this.id };
      this.claimService.addclaim(data,this.jwt).subscribe(res=>{
          console.log(res);
          this.show = true;

      })
  }
    }

