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

  ngOnInit(): void {
    this.CS.deleteAllCookies();

  }
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })
  login() {
    //console.warn(this.loginForm.value);
    //  let logindata=JSON.stringify(this.loginForm.value);
      this.ls.login(this.loginForm.value).subscribe(res=>{
          console.warn(res) ;
          this.CS.setCookieToken(res.jwt);
          var decoded = jwt_decode(res.jwt) as any ;
          this.CS.setCookieId(decoded.id);
          this.CS.setCookieCostom("role",decoded.role);
          if (decoded.role == "user"){
            console.log(this.CS.getCookieIDUser());
            this._router.navigate(['/home']);
          }
          if (decoded.role == "admin"){
                console.log(decoded.role);
             //   this._router.navigate(['/dashboard']);
                //redirection dashbord
          }else {
               console.log("not admin");
            //  this._router.navigate(['/ass/user']);
                //redirection interface user
          }
     },
    error => {
   console.log(error.error);
 // login failed, show error message
      }

        )

  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
