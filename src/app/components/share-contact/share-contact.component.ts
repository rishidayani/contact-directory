import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-share-contact',
  templateUrl: './share-contact.component.html',
  styleUrls: ['./share-contact.component.css'],
})
export class ShareContactComponent implements OnInit {
  users = [
    {
      userName: '',
      email: '',
      image: '',
      age: 0,
    },
  ];
  keepAlive: boolean = false;
  contacts: any = [];
  selectedUsers: any = [];
  userDetails: any = {
    userName: '',
    image: '',
  };

  constructor(
    private authService: AuthService,
    private contactService: ContactService
  ) {}
  ngOnInit(): void {
    this.profile();
    this.contactService.getAllContacts().subscribe({
      next: (data: any) => {
        this.contacts = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  profile() {
    this.authService.userProfile().subscribe(
      (data: any) => {
        this.userDetails.userName = data.userName;
        this.userDetails.image = data.image;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  public getUsers() {
    if (this.keepAlive) {
      this.keepAlive = false;
      return;
    } else {
      this.authService.getAllUser().subscribe({
        next: (data: any) => {
          this.users = data;
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  public selectUser(index: number) {
    this.selectedUsers.push(this.users[index]);
    this.users.splice(index, 1);
  }

  public removeUserFromSelectedList(index: number) {
    this.users.push(this.selectedUsers[index]);
    this.selectedUsers.splice(index, 1);
  }

  public shareContact() {
    for (let i = 0; i < this.selectedUsers.length; i++) {
      const recieverId = this.selectedUsers[i]._id;
      this.contactService
        .sendContact(recieverId, this.contacts, this.userDetails)
        .subscribe({
          next: () => {
            this.keepAlive = false;
            // console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
    this.selectedUsers = [];
  }

  public close() {
    this.keepAlive = true;
    // this.selectedUsers = [];
  }
}
