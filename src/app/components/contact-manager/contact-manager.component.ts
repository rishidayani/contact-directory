import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  contacts = [
    {
      name: '',
      mobile: '',
      createdAt: '',
      _id: '',
      updatedAt: '',
      photo: ''
    },
  ];
  public errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  public getAllContactsFromServer() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.contacts = data;
        // console.log(this.contacts[0]);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  public deleteContact(contactId: string) {
    if (contactId) {
      this.contactService.deleteteContact(contactId).subscribe((data) => {
        this.getAllContactsFromServer();
      });
    }
  }
}
