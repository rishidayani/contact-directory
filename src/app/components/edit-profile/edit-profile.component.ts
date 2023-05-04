import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user: any = {
    userName: '',
    email: '',
    image: '',
    age: null,
    gender: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userProfile().subscribe((data) => {
      this.user = data;
    });
  }

  onSubmitUpdate(authForm: NgForm) {
    this.authService.editProfile(authForm).subscribe(() => {
      this.router.navigate(['/contacts/me']).then();
    });
  }
}
