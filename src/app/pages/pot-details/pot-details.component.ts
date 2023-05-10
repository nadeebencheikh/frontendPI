import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { PotService } from 'src/app/services/pot/pot.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-pot-details',
  templateUrl: './pot-details.component.html',
  styleUrls: ['./pot-details.component.css']
})
export class PotDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute ,private router: Router,private potService: PotService ,private cs:CookiesService  ){
    this.jwt=this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();
   }
   fourpots:any;
    jwt : string;
    id:number;
    pot:any;
    exp:any;
    numpart=0;
    showMessage = false;
    addpart = new FormGroup({
      amount: new FormControl('', [Validators.required,Validators.minLength(1)]),


  })

  async ngOnInit() {
    this.potService.getpot(this.jwt).subscribe(res=>{
      this.fourpots=res.slice(-3);

console.log(this.fourpots);


 });




           const potId = this.route.snapshot.paramMap.get('idPot');
            console.log(potId);
         await this.potService.getonepot(this.jwt,potId).toPromise()
          .then( res=>{
             console.log(res);
               this.pot=res;
              this.exp = new Date(this.pot['expireDate']);
               const now = new Date();
                console.log(this.getDateDiff(new Date(this.pot['expireDate']),now))
           });
           await this.potService.numpart(this.pot,this.jwt).toPromise()
          .then( res=>{
             this.numpart=res.length;

           });

            this.showTime();
            this.updateDate();


  }

   getDateDiff(date1: Date, date2: Date): string {
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }


    showTime() {
    let time = new Date();
    const diffInMs = Math.abs(time.getTime() - this.exp.getTime());
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    const displayTime = document.querySelector(".display-time") as HTMLElement;
    displayTime.innerText = `${hours}: ${minutes}: ${seconds}`;
    setInterval(() => {
      this.showTime();
    }, 1000);
  }

   updateDate() {
    let today = new Date();
    const diffInMs = Math.abs( today.getTime()  - this.exp.getTime() );
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    // return number
    let dayName = today.getDay(),
      dayNum = today.getDate(),
      month = today.getMonth(),
      year = today.getFullYear();

    const months = [    "January",    "February",    "March",    "April",    "May",    "June",    "July",    "August",    "September",    "October",    "November",    "December",  ];
    const dayWeek = [    "Sunday",    "Monday",    "Tuesday",    "Wednesday",    "Thursday",    "Friday",    "Saturday",  ];
    // value -> ID of the html element
    const IDCollection = ["day", "daynum", "month", "year"];
    // return value array with number as a index
    const val = [ dayNum.toString(),"  days left"];
    for (let i = 0; i < IDCollection.length; i++) {
      const element = document.getElementById(IDCollection[i]);
      if (element !== null) {
        element!.firstChild!.nodeValue = val[i];
      }
    }
    setInterval(() => {
      this.updateDate();
    }, 1000);
  }


  addp() {
    const potId = this.route.snapshot.paramMap.get('idPot');
    let data:any=(this.addpart.value);
    data['user'] = { idUser: this.id };
    data['pot'] = { idPot: parseInt(potId!)};
    console.log(data);

    this.potService.addpart(data,this.jwt).subscribe(res=>{
        console.log(res);
        this.showMessage = true;
        setTimeout(() => {
          this.router.navigate(['/potgrid']);
        }, 1000);
    })

}

getImageSrc(image: any): string {
  return 'data:'+ image.contentType+';base64,' + image.bytes;
 }

}
