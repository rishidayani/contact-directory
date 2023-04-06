import { Component, OnInit } from '@angular/core';
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
  public contact: IContact|any = {
    id: '',
    name: '',
    mobile: ''
  };
  public errorMessage: string | null = null;

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
      this.contactService.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        
      });
    }
  }

  public submitUpdate(val: any) {
    if (this.contactId) {
      val.createdAt = this.contact.createdAt
      val.updatedAt = new Date()
      this.contactService.updateContact(val, this.contactId).subscribe(
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
