import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-resetmail',
  templateUrl: './resetmail.component.html',
  styleUrls: ['./resetmail.component.css']
})
export class ResetmailComponent implements OnInit{
  show = false;
  showsp = false;
  showsp2 = false;
  isLoading: boolean = false;
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  get email() {
    return this.resetForm.get('email')!;
  }

  constructor(private LS: LoginService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

  }
  reset(){
    console.log(this.email.value);
    this.show= true;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 10000);
    this.LS.resetemail(this.email.value).subscribe(res=>{
      this.isLoading = false;
      console.log(res);
      //

        if (res==true){
          console.log("true");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
          this.showsp = true;

          //gestion
        }else {
          console.log("false");
          this.showsp2 =true ;
          //gestion
        }

    },error=>{
      this.showsp2 =true ;
    })
  }
}
