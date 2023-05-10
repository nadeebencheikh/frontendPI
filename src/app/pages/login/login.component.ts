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

          console.log(res);
          this.ls.getoneuser(res.jwt,decoded.id).subscribe(res=>{
            let statue= res.status;
          if (decoded.role == "user" && (statue == 1 ||statue == 3)){
            console.log(this.CS.getCookieIDUser());
            this._router.navigate(['/home']);
          }
          if (decoded.role == "admin"){
            this.message="You are not allowed your role is admin"
             //   this._router.navigate(['/dashboard']);
                //redirection dashbord
          }else if ( statue==0) {
            this.err=true;
            this.message="Sorry Your account is blocked "
             //
                //redirection interface user
          }


          else {
               console.log("not admin");
               this.message="You are not allowed your role is admin"
            //  this._router.navigate(['/ass/user']);
                //redirection interface user
          }})
     },
    error => {
      this.err=true;
      this.message="Sorry please check your credentials"
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
