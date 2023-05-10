import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { LoginService } from 'src/app/services/login/login.service';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( private _router: Router ,private ls :LoginService,private CS: CookiesService) { }
err=false;
message="";
  ngOnInit(): void {
    this.CS.deleteAllCookies();

  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(4)])
  })
  login() {
    //console.warn(this.loginForm.value);
    //  let logindata=JSON.stringify(this.loginForm.value);
      this.ls.login(this.loginForm.value).subscribe(res=>{
          console.warn(res) ;
          this.CS.setCookieToken(res.accessToken);
          //var decoded = jwt_decode(res.accessToken) as any ;
          //this.CS.setCookieId(decoded.id);
          this.CS.setCookieCostom("role","user");
          //if (decoded.role == "user"){
            //console.log(this.CS.getCookieIDUser());
            this._router.navigate(['/chat']);
         // }
          // if (decoded.role == "admin"){
          //   this.message="You are not allowed your role is admin"
          //    //   this._router.navigate(['/dashboard']);
          //       //redirection dashbord
          // }else {
          //      console.log("not admin");
          //      this.message="You are not allowed your role is admin"
          //   //  this._router.navigate(['/ass/user']);
          //       //redirection interface user
          // }
     },
    error => {
      this.err=true;
      this.message="Sorry please check your credentials"
   console.log(error.error);
 // login failed, show error message
      }

        )

  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
