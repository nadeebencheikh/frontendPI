import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService} from '../../services/chat/chat.service'
import { FormBuilder, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Chat } from './Models/Chat';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  jwt : string ;
  email: string;
  publicChat:  Chat[]= [];
  privateChats: Map<string,Chat[]>;
  tab = "chatroom";
  sendMessageForm = new FormGroup({
    senderName: new FormControl('', []),
    receiverName: new FormControl('', []),
    message: new FormControl('', []),
    date: new FormControl('', []),
    status: new FormControl('', [])
  })
  chat:any;
  
  constructor(private chatService: ChatService,private ngxCookieService: CookieService){
    this.privateChats = new Map<string , Chat[]>();
    let list :Chat[]= [];
    this.privateChats.set("chatroom",list);
    this.jwt = this.ngxCookieService.get("jwt");   
    var decoded = jwt_decode(this.jwt) as any ;
    this.email = decoded.sub;
    console.log("email : " + this.email);
  }

  ngOnInit(): void {
    this.chatService.getPrivateChats(this.jwt,this.email)
    .subscribe(
      (Response: Chat[]) => {
        const chats = Response;
        for (const chat of chats) {

                if ( !this.privateChats.has(this.email) && this.privateChats.has(chat.receiverName)  ){
                  this.privateChats.get(chat.receiverName)?.push(chat);
                }else if (  !this.privateChats.has(this.email) && this.privateChats.has(chat.senderName) ){
                  this.privateChats.get(chat.senderName)?.push(chat);
                }else{
                  let list :Chat[]= [];
                  list.push(chat);
                  if ( chat.senderName !== this.email  ){
                      this.privateChats.set(chat.senderName,list);
                  }else if (chat.receiverName !== this.email ){
                      this.privateChats.set(chat.receiverName,list);
                  }
                }
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    console.log(this.privateChats);
    console.log(this.privateChats.has("salwa"));

       this.chatService.getPublicChats(this.jwt)
    .subscribe(
      (Response: any) => {
          const chats = Response;
          for (const chat of chats){
            this.publicChat.push(chat);
          }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
      console.log(this.publicChat);
  
  };
 

  setTab(name : any){
    this.tab=name;
    console.log(this.tab);
  }

  sendPublicMessage(){
    let message : any = this.sendMessageForm.get('message')?.value;
    this.chat = new Chat(this.email,"none",message,"2000","MESSAGE");
  }

  sendPrivateMessage(){
    let message : any = this.sendMessageForm.get('message')?.value;
    this.chat = new Chat(this.email,this.tab,message,"2000","MESSAGE");

  }
}
