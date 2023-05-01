import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public contactId: string | null = null;
  public contact: IContact = {
    _id: '',
    name: '',
    mobile: '',
    lastName: '',
    firstName: '',
    photo: '',
    createdAt: '',
    updatedAt: '',
  };
  public errorMessage: string | null = null;
  editForm: FormGroup | any;

  constructor(
    private acticatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.acticatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((data: any) => {
        this.contact = data;
      });
    }
    this.editForm = new FormGroup({
      firstName: new FormControl(this.contact.firstName),
      lastName: new FormControl(this.contact.lastName),
      photo: new FormControl(this.contact.photo),
      mobile: new FormControl(this.contact.mobile)
    });
  }

  // public submitUpdate(val: any) {
  //   if (this.contactId) {
  //     val.name = this.contact.firstName + ' ' + this.contact.lastName;
  //     this.contactService.updateContact(val, this.contactId).subscribe(
  //       () => {
  //         this.router.navigate(['/']).then();
  //       },
  //       (error) => {
  //         this.errorMessage = error;
  //         this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
  //       }
  //     );
  //   }
  // }
  public submitUpdate() {
      if (this.contactId) {
        this.editForm.value.name = this.contact.firstName + ' ' + this.contact.lastName;
        this.contactService.updateContact(this.editForm.value, this.contactId).subscribe(
          () => {
            this.router.navigate(['/']).then();
          },
          (error) => {
            this.errorMessage = error;
            this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
          }
        );
      }
    }
}
