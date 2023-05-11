import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

interface SenderDetails {
  image: string;
  userName: string;
  _id: string;
}

interface SharedData {
  recieverId: string;
  senderId: string;
  contacts: IContact[];
  senderDetails: SenderDetails;
  _id: string;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  @Output() toggleSidebarEmiter = new EventEmitter<boolean>();
  @Input() toggleSidebar: boolean = false;
  sharedData: SharedData[] = [
    {
      recieverId: '',
      senderId: '',
      contacts: [
        {
          _id: '',
          name: '',
          firstName: '',
          lastName: '',
          photo: '',
          mobile: '',
          createdAt: '',
          updatedAt: '',
        },
      ],
      senderDetails: {
        image: '',
        userName: '',
        _id: '',
      },
      _id: '',
    },
  ];

  constructor(
    private contactService: ContactService,
    private toaster: ToastrService
  ) {}

  togleSidebarValue() {
    this.toggleSidebar = !this.toggleSidebar;
    this.toggleSidebarEmiter.emit(this.toggleSidebar);
  }

  ngOnInit(): void {}

  displayContact() {
    this.contactService.getSharedContact().subscribe({
      next: (data: any) => {
        this.sharedData = data;
        // console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public addToDirectory(i: number, j: number) {
    const { name, firstName, lastName, photo, mobile } =
      this.sharedData[i].contacts[j];
    const id = this.sharedData[i]._id;
    const contact = { name, firstName, lastName, photo, mobile };
    // console.log(id);
    this.contactService.createContact(contact).subscribe({
      next: () => {
        this.removeFromBackend(id, mobile);
      },
      error: (error) => {
        this.toaster.warning(error.error);
      },
    });
    this.sharedData[i].contacts.splice(j, 1);
  }

  public remove(i: number, j: number) {
    const { mobile } = this.sharedData[i].contacts[j];
    const id = this.sharedData[i]._id;
    this.removeFromBackend(id, mobile);
    this.sharedData[i].contacts.splice(j, 1);
  }

  removeFromBackend(id: string, mobile: string) {
    this.contactService.deleteSharedContact(id, mobile).subscribe({
      next: () => {},
      error: (e) => {
        console.log(e);
      },
    });
  }
}
