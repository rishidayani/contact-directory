import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { IContact } from '../models/IContact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  // public contactId: string  = '642d726af97948af0e7b209f';
  // private serverUrl:string = `http://localhost:3000`
  contact : IContact | any = {
    name: '',
    mobile: '',
    createdAt: '',
    updatedAt: ''
  }
  constructor (
    private contactService: ContactService,
    private router: Router
  ){}
  ngOnInit(): void {

  }

  timeoutId: any
  search(event : Event){
    if (this.timeoutId) {
      clearInterval(this.timeoutId)
    }
    this.timeoutId = setTimeout(()=> {
      this.contactService.search((event.target as HTMLInputElement).value).subscribe((data) => {
        this.contact = data
        // console.log(data)
      })
    },500)
  }
    
  public search1() {
    this.router.navigate([`contacts/view/${this.contact[0]._id}`])
    // console.log('hello');
  }

  timeoutId2: any
  search2 (event: Event) {
    if (this.timeoutId2) {
      clearInterval(this.timeoutId2)
    }
    this.timeoutId2 = setTimeout(()=> {
      this.contactService.search2((event.target as HTMLInputElement).value).subscribe((data) => {
        this.contact = data
        // console.log(data)
      })
    },500)
  }
}
