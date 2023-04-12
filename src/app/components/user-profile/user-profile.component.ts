import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit{
  user: any = {
    userName: '',
    email: '',
    _id: '',
    image:'',
    age: null,
    gender: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
}
