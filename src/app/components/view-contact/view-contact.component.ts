import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  // public loading: boolean = false,
  public contactId: string | null = null;
  public contact = {
    name: '',
    mobile: '',
    createdAt: '',
    _id: '',
    updatedAt: '',
    photo: '',
    firstName: '',
    lastName: '',
  };
  public errorMessage: string | null = null;

  constructor(
    private acticatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.acticatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((data: any) => {
        // console.log(data);
        this.contact = data;
      });
    }
  }
}
