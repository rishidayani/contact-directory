import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { IContact } from '../models/IContact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public contactId: string  = '642d726af97948af0e7b209f';
  // private serverUrl:string = `http://localhost:3000`
  contact : IContact | any = {}
  constructor (
    private contactService: ContactService,
    private router: Router
  ){}
  ngOnInit(): void {

  }

  public timeoutId: any
  search(event : Event){
    if (this.timeoutId) {
      clearInterval(this.timeoutId)
    }
    this.timeoutId = setTimeout(()=> {
      console.log((event.target as HTMLInputElement).value)
    },500)
  }
  public search1() {
    console.log('hello');
    // this.contactService.getContact(this.contactId).subscribe(
      // (data:any) => {
        // this.contact = data
        // this.router.navigate([`contacts/view/${this.contactId}`])
      // }
    // )
  }
}
