import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    userName: ''
  }
  public errorMessage: string | null = null;
  showDialoge: boolean = false;

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
    this.profile()
    
  }

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
    if (window.confirm('Are you sure you want to delete this contact')) {
      if (contactId) {
        this.contactService.deleteteContact(contactId).subscribe((data) => {
          this.getAllContactsFromServer();
        });
      }
    }
  }

  public deleteUserProfile() {
    if (window.confirm('Are you sure you want to delete Your profile')) {
      this.authService.deleteProfile().subscribe(() => {
        this.router.navigate(['/contacts/auth'])
      });
    }
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        // console.log(data);
        localStorage.removeItem('token');
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
