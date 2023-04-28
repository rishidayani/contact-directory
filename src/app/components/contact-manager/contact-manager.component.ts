import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
    this.profile();
    this.autologout();
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
              mobile: data[i].phoneNumbers[0].canonicalForm.slice(3),
            });
          }
        }

        for (let i = 0; i< a.length; i++) {
          let contact = {
            name: a[i].name,
            mobile: a[i].mobile,
          }
          this.contactService.createContact(contact).subscribe()
        }
        this.getAllContactsFromServer()
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
    if (window.confirm('Are you sure you want to delete this contact')) {
      if (contactId) {
        this.contactService.deleteteContact(contactId).subscribe((data) => {
          this.getAllContactsFromServer();
        });
      }
    }
  }

  //Download all the contacts as an csv file
  exportContacts() {
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
    if (window.confirm('Are you sure you want to delete Your profile')) {
      this.authService.deleteProfile().subscribe(() => {
        this.router.navigate(['/contacts/auth']);
      });
    }
  }

  //Logging out an user from system
  logout() {
    this.authService.logout().subscribe(
      () => {
        // console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('gToken');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      (e) => {
        console.log(e);
      }
    );
    this.router.navigate(['/contacts/auth']);
  }

  //auto logout after token expiers
  autologout() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 3599000);
  }

  openProfileDialogeBox() {
    this.showDialoge = !this.showDialoge;
  }
}
