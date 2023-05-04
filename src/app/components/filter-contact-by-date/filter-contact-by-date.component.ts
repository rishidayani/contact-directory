import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-filter-contact-by-date',
  templateUrl: './filter-contact-by-date.component.html',
  styleUrls: ['./filter-contact-by-date.component.css'],
})
export class FilterContactByDateComponent {
  date: Date = new Date();
  hasDate: boolean = false;
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
  timeoutId: any;
  isValidDate: boolean = true;
  constructor(
    private contactService: ContactService,
    private elementRef: ElementRef,
    private router: Router
  ) {}
  public getDateByCalender(date: any) {
    date = new Date(`${date.year}-${date.month}-${date.day}`);
    this.getContactsByDate(date);
  }

  public getDateManually(event: Event) {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      let query: string = (event.target as HTMLInputElement).value;
      //will match if query is empty or spaces
      let matchSpaces: any = query.match(/\s*/);
      if (matchSpaces[0] === query) {
        this.contacts = [];
        this.hasDate = false;
        return;
      }
      const date = new Date(query.trim());
      if (isNaN(date.getTime())) {
        this.isValidDate = false;
        this.hasDate = false;
        return;
      }
      this.getContactsByDate(date);
    }, 1000);
  }

  public hideContactList() {
    this.hasDate = false;
  }

  public getContactsByDate(date: Date) {
    this.contactService.filterByDate(date).subscribe({
      next: (data) => {
        this.contacts = data;
        this.hasDate = true;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  goToContact(id: string) {
    this.contactService.getContact(id).subscribe({
      next: (data) => {
        this.contact = data;
        this.router.navigate(['contacts/view/' + id]);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hasDate = false;
      this.isValidDate = true;
    } else {
      let query: string = (event.target as HTMLInputElement).value;
      if (typeof query !== 'string') {
        return; // Exit early if the query is not a string
      }
      let matchSpaces: any = query.match(/\s*/);
      // If the user clicks inside the search input field, show the search results section
      if (matchSpaces[0] !== query) {
        this.hasDate = true;
      } else {
        this.hasDate = false;
      }
    }
  }
}
