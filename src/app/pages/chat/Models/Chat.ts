export class Chat{
    senderName!: string;
    receiverName!: string;
    message!: string;
    date!: string;
    status!: string;

    constructor(senderName:string , receiverName:string,message:string,date:string,status:string){
        this.senderName=senderName;
        this.receiverName=receiverName;
        this.message=message;
        this.date=date;
        this.status=status;
    }
}
      