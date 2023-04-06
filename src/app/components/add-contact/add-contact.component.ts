import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public contact = {
    name: '',
    mobile: '',
    createdAt: '',
    _id: '',
    photo: ''
  }
  public errorMessage : string | null  = null

  constructor (
    private contactService: ContactService,
    private router: Router    
    ) {}

  ngOnInit(): void {
      
  }

  public createContact(val: any) {
    val.createdAt = new Date()
    this.contactService.createContact(val).subscribe((data)=> {
      this.router.navigate(['/']).then()
    } ,(error) => {
      this.errorMessage = error
      this.router.navigate(['/contacts/add']).then()
    })
  }

}
