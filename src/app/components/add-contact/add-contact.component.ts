import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  public contact: IContact = {
    name: '',
    mobile: '',
    createdAt: '',
    _id: '',
    photo: '',
    firstName: '',
    lastName: '',
  };
  public errorMessage: string | null = null;
  show: boolean = false;
  createForm: FormGroup | any;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      photo: new FormControl(),
      mobile: new FormControl(null),
    });
  }

  // public createContact(val: any) {
  //   val.createdAt = new Date();
  //   this.contactService.createContact(val).subscribe(
  //     (data) => {
  //       this.router.navigate(['/']).then();
  //     },
  //     (error) => {
  //       this.errorMessage = error;
  //       this.router.navigate(['/contacts/add']).then();
  //     }
  //   );
  // }

  createContact() {
    this.contact = this.createForm.value;
    this.contact.name =
      this.createForm.value.firstName + ' ' + this.createForm.value.lastName;
    // console.log(this.contact);
    this.contactService.createContact(this.contact).subscribe(
      (data) => {
        // console.log(data);
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.toaster.warning(error.error);
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }
}
