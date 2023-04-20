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

const routes: Routes = [
  {path: '' , redirectTo: 'contacts/admin', pathMatch: 'full'},
  {path: 'contacts/admin', component: ContactManagerComponent},
  {path: 'contacts/add', component: AddContactComponent},
  {path: 'contacts/edit/:contactId', component: EditContactComponent},
  {path: 'contacts/view/:contactId', component: ViewContactComponent},
  {path: 'contacts/me', component: UserProfileComponent},
  {path: 'contacts/editProfile', component: EditProfileComponent},
  {path: 'contacts/changePassword', component: ChangePasswordComponent},
  {path: 'contacts/auth', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
