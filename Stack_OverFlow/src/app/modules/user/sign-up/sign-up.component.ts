import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm!:FormGroup

  constructor(
    private _user:UserAuthService,
    private router:Router,
    private toastr:ToastrService
  ){}

  ngOnInit(){
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")

      ]),
      displayname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  signup(data:any){
    this._user.signUp(data).pipe(tap((res:any)=>{
      console.log(res);
      if(res){
        this.toastr.success("Register success")
        this.router.navigate(['/module/user/login'])
      }
    }),
    catchError((err:any)=>{
      return throwError(()=> this.toastr.error("error"))
    })
    ).subscribe();
  }
}
