import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/Models/event';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { EventService } from 'src/app/services/event/event.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id?: number
  event?: Event
  compteur?:number
  checkk ?: boolean
  iduser? : number
  jwt : string;
  
  
  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router,private cs:CookiesService) { 
    this.jwt=this.cs.getCookieJWT().toString();
      this.iduser=this.cs.getCookieIDUser();
  }
  ngOnInit(): void {
    this.eventService.auth(this.jwt);
    this.id = this.route.snapshot.params['id'];
//-------------------------
   
    this.eventService.check(this.iduser, this.id).subscribe(result => {
      if (result === 0) {
        this.checkk=true;
        
        
        // perform some action if check returns 0
      } else {
       
        // perform some other action if check returns a value other than 0
        this.checkk=false;
      }
    });
    //-----------------------------------------------------

    this.event = new Event();
    this.eventService.getEvenementById(this.id!).subscribe( data => {
      this.event = data;
    });
  }

  /*participer(id? : number){
    id2:Number;
    const id2=1;
    this.eventService.participerEvenement(id2,id);
    console.log(id);
   
    this.router.navigate(['event']);
  }*/

  /*participer(id?: number) {
    const id2 = 1;
    this.eventService.participerEvenement(id2, id).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.log('Error:', error);
    });
  
    this.router.navigate(['event']);
  }*/

  participer(id?: number) {
   
   
    
    this.eventService.check(this.iduser, id).subscribe(result => {
      if (result === 0) {
        this.checkk=true;
        this.eventService.participerEvenement(this.iduser, id).subscribe(response => {
          this.downloadPdf(response);
        }, error => {
          console.log('Error:', error);
        });
        
        // perform some action if check returns 0
      } else {
        alert("you have already participated to this event")
        // perform some other action if check returns a value other than 0
        this.checkk=false;
      }
    });
    this.router.navigate(['event']);
  }

  getImageSrc(image: any): string {
    console.log(image)
    return 'data:'+ image.contentType+';base64,' + image.bytes;
   }
  
  downloadPdf(data: any) {
    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = 'qrcode.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(fileURL);
  }

  annuler(id?: number) {
    
    
    this.eventService.check(this.iduser, id).subscribe(
      result => {
        if (result === 0) {
          this.checkk=true;
          // perform some action if check returns 0
        } else {
          console.log(result);
          // perform some other action if check returns a value other than 0
          this.checkk=false;
          this.eventService.annulerparticipationEvenement(this.iduser, id).subscribe(
            response => {
              console.log(response); // log the response to the console
            },
            error => {
              console.error(error); // log any errors to the console
            }
          );
        }
      },
      error => {
        console.error(error); // log any errors to the console
      }
    );
    
    this.router.navigate(['event']);
}
  
  
     
}
