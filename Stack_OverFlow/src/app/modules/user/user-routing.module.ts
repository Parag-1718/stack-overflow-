import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'user-profile',
    canActivate:[AuthGuard],
    component:UserProfileComponent
  },
  {
    path:'add',
    canActivate:[AuthGuard],
    component:AddQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
