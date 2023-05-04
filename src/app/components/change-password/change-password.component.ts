import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: any = {
    currPassword: '',
    password: '',
  };
  error: string | null = null;
  // show: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  updatePassword() {
    // console.log(this.user);
    this.authService.changePassword(this.user).subscribe(
      () => {
        this.authService.logout().subscribe(
          () => {
            localStorage.removeItem('token');
          },
          (e) => {
            console.log(e);
          }
        );
        this.router.navigate(['/contacts/auth']).then();
      },
      (error) => {
        this.toastr.error('Error: ' + error.error);
      }
    );
  }

  closeError() {
    this.error = null;
  }
}
