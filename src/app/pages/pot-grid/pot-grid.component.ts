import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { PotService } from 'src/app/services/pot/pot.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-pot-grid',
  templateUrl: './pot-grid.component.html',
  styleUrls: ['./pot-grid.component.css']
})

export class PotGridComponent implements OnInit {
  constructor(private potService: PotService ,private cs:CookiesService  ){
    this.jwt=this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();}

  jwt : string;
  pots!: any[];
  id:number;
  currentPage = 1;
  maxCards = 5;
  totalPages!: number;
  pages: number[] = [];
  selectedfile:any;

  addform = new FormGroup({
    title: new FormControl('', [Validators.required,Validators.minLength(4)]),
    detail: new FormControl('', [Validators.required,Validators.minLength(4)]),
    goalAmount: new FormControl('', [Validators.required]),
    expireDate: new FormControl('', [Validators.required]),

})

  ngOnInit(): void {
    this.potService.getpot(this.jwt).subscribe(res=>{
        this.pots=res.reverse();
        this.totalPages = Math.ceil(this.pots.length / this.maxCards);
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);

   });
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  getVisiblePosts(): any[] {
    const startIndex = (this.currentPage - 1) * this.maxCards;
    const endIndex = startIndex + this.maxCards;
    return this.pots.slice(startIndex, endIndex);
  }
  getImageSrc(image: any): string {
   return 'data:'+ image.contentType+';base64,' + image.bytes;
  }

  addpot() {
    let data:any=(this.addform.value);
    data['user'] = { idUser: this.id };
    console.log(data);
    const formData: FormData = new FormData();
    formData.append('image', this.selectedfile, this.selectedfile.name);
    formData.append('pot', JSON.stringify(data));
    this.potService.addpot(formData,this.jwt).subscribe(res=>{
        console.log(res);
        window.location.reload();

    })
}

onFileSelected(event:any) {
  this.selectedfile=  event.target.files[0];
}

}
