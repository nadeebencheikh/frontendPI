import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/Models/event';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events?: Event[];
  jwt : string;
  id:number;
  constructor(private eventService: EventService  ,
    private router: Router ,private cs:CookiesService) { 
      this.jwt=this.cs.getCookieJWT().toString();
      this.id=this.cs.getCookieIDUser();
    }
    
  ngOnInit(): void {
    this.eventService.auth(this.jwt);
    this.getEvents();
  }

  private getEvents(){
    this.eventService.getEvenementsList().subscribe(data => {
      this.events = data;
    });
  }

  eventDetails(id: number){
    this.router.navigate(['eventdetail', id]);
  } 

}
