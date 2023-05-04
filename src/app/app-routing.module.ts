import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts/admin',
    pathMatch: 'full',
  },
  {
    path: 'contacts/admin',
    component: ContactManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/add',
    component: AddContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/edit/:contactId',
    component: EditContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/view/:contactId',
    component: ViewContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/me',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/editProfile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'contacts/auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
