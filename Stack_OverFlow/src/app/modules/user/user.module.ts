import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClient } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddQuestionComponent } from './add-question/add-question.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    AddQuestionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
