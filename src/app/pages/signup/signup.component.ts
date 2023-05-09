import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor( private _router: Router ,private ls :LoginService,private CS: CookiesService,private us: UserService) { }
  err=false;
  ngOnInit(): void {
    this.CS.deleteAllCookies();

  }
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required,Validators.minLength(4)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    login: new FormControl('', [Validators.required,Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })
  signup(){
           console.log(this.signupForm.value)
           this.us.save(this.signupForm.value).subscribe(res=>{
            // console.log(res);
             //window.location.reload();
             this._router.navigate(['/login']);

         },error=>{

           this.err=true;
         })
  }

}
