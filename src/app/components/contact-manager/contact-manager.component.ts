import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
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
      photo: '',
    },
  ];
  user: any = {
    image: '',
    userName: '',
  };
  public errorMessage: string | null = null;
  showDialoge: boolean = false;
  tokenExpirationTimer: any = null;
  gToken: any = localStorage.getItem('gToken');

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
    this.profile();
  }

  //view Profile
  profile() {
    this.authService.userProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  //Google account sync
  public getGContact() {
    this.contactService.getGoogleContact().subscribe(
      (data: any) => {
        const a: any = [];
        const b: any = [];
        for (let i = 0; i < this.contacts.length; i++) {
          b.push(this.contacts[i].mobile);
        }
        for (let i = 0; i < data.length; i++) {
          if (!b.includes(data[i].phoneNumbers[0].canonicalForm.slice(3))) {
            a.push({
              name: data[i].names[0].displayName,
              firstName: data[i].names[0].givenName,
              lastName: data[i].names[0].familyName,
              mobile: data[i].phoneNumbers[0].canonicalForm.slice(3),
              photo: data[i].photos[0].url,
            });
          }
        }
        if (a.length === 0) {
          this.toaster.warning(
            'All contacts are up to date with your google account'
          );
        }

        for (let i = 0; i < a.length; i++) {
          let contact = {
            name: a[i].name,
            mobile: a[i].mobile,
            firstName: a[i].firstName,
            lastName: a[i].lastName,
            photo: a[i].photo,
          };
          this.contactService.createContact(contact).subscribe();
        }
        this.getAllContactsFromServer();
      },
      (e) => {
        console.log(e);
      }
    );
  }

  //get all contact from db in order to show on manager panel
  public getAllContactsFromServer() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next: (data: any) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Delete contact
  public deleteContact(contactId: string) {
    if (contactId) {
      this.contactService.deleteteContact(contactId).subscribe((data) => {
        this.getAllContactsFromServer();
      });
    }
  }

  //Download all the contacts as an csv file
  public exportContacts() {
    const contactsArray = Array.from(this.contacts); // convert contacts to an array
    const csvRows = [];
    const headers = ['name', 'mobile'];
    csvRows.push(headers.join(','));

    for (const contact of contactsArray) {
      const values = [
        contact.name,
        // contact.email,
        contact.mobile,
      ];
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const a = document.createElement('a');
    a.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString)
    );
    a.setAttribute('download', 'contacts.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  //delete user profile
  public deleteUserProfile() {
    this.authService.deleteProfile().subscribe(() => {
      this.router.navigate(['/contacts/auth']);
    });
  }

  //Logging out an user from system
  public logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('gToken');
      },
      (e) => {
        console.log(e);
      }
    );
    this.router.navigate(['/contacts/auth']);
  }

  openProfileDialogeBox() {
    this.showDialoge = !this.showDialoge;
  }
}
