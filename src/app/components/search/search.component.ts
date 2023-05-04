import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../models/IContact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // public contactId: string  = '642d726af97948af0e7b209f';
  // private serverUrl:string = `http://localhost:3000`
  contact: IContact | any = {
    name: '',
    mobile: '',
    createdAt: '',
    updatedAt: '',
  };
  contacts: any = [
    {
      name: '',
      mobile: '',
      createdAt: '',
      _id: '',
      updatedAt: '',
      photo: '',
    },
  ];
  hasQuery: boolean = false;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  timeoutId: any;
  search(event: Event) {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      let query: string = (event.target as HTMLInputElement).value;
      //will match if query is empty or spaces
      let matchSpaces: any = query.match(/\s*/);
      if (matchSpaces[0] === query) {
        this.contacts = [];
        this.hasQuery = false;
        return;
      }
      this.contactService.search(query.trim()).subscribe((data) => {
        this.contacts = data;
        this.hasQuery = true;
        // console.log(data)
        // console.log(this.contacts);
      });
    }, 500);
  }

  goToContact(name: any) {
    this.contactService.findContact(name).subscribe((data) => {
      this.contact = data;
      this.router.navigate([`contacts/view/${this.contact[0]._id}`]);
      // console.log(data);
    });
    // console.log(name);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hasQuery = false;
    } else {
      let query: string = (event.target as HTMLInputElement).value;
      if (typeof query !== 'string') {
        return; // Exit early if the query is not a string
      }
      let matchSpaces: any = query.match(/\s*/);
      // If the user clicks inside the search input field, show the search results section
      if (matchSpaces[0] !== query) {
        this.hasQuery = true;
      } else this.hasQuery = false;
    }
  }
}
