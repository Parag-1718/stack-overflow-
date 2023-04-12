import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup
  error:string = ''
  showerr:boolean = false

  constructor(
    private _user:UserAuthService,
    private router:Router,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
      ]),
    });
  }

  login(data:any){
    this._user.login(data).pipe(tap((res:any)=>{
      if(res && res.body && res.body.length){
        this.toastr.success("login success")
        localStorage.setItem("users",JSON.stringify(res.body))
        this.router.navigate(['/'])
        // console.log(res);
      }
        else{
           this.error = "invalid email or password"
           this.toastr.error(this.error)
        }
    }),
    catchError((err:any)=>{
      console.log("errr");
      return throwError(()=> err)
    })
    ).subscribe();
  }
}
