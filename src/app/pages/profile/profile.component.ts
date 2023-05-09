import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  constructor(private activatedRoute: ActivatedRoute, private _router: Router, private cs: CookiesService,private us: UserService){}
  profile = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required,Validators.minLength(4)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    login: new FormControl('', [Validators.required,Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })
    jwt!:string;
    user!:any;
    err=false;
   async ngOnInit(): Promise<void> {
     //window.location.reload();
     this.jwt=this.cs.getCookieJWT().toString();
     const id = this.cs.getCookieIDUser();
     console.log(id);
     const userPromise = this.us.getoneuser(this.jwt, id).toPromise();
     this.user = await userPromise;

        console.log(this.user);
        this.profile.patchValue({
            name:  this.user.name,
            lastname:  this.user.lastname,
            email:  this.user.email,
            login:  this.user.login,
            phone:  this.user.phone,
            password:  this.user.password

          });


   }
   update(){

this.user["name"]=this.profile.get(['name'])!.value;
this.user["lastname"]=this.profile.get(['lastname'])!.value;
this.user["email"]=this.profile.get(['email'])!.value;
this.user["phone"]=this.profile.get(['phone'])!.value;
this.user["login"]=this.profile.get(['login'])!.value;
this.user["password"]=this.profile.get(['password'])!.value;
    this.us.updateuser(this.user,this.jwt).subscribe(res=>{
      this.err= true;
      console.log(res);

      this.err = true;



    // Redirect to login after 5 seconds
    setTimeout(() => {
      this._router.navigate(['/login']);
    }, 5000);


    })


   }



}
