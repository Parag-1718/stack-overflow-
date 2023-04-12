import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  //#region 
  userDetails:any = [];
  constructor(
    private _user:UserAuthService,
    private _que:QuestionsService,
    private router:Router
  ){}

  ngOnInit(){
    this.getuserDetails()
    this.getQuestion();

    this.router.events.subscribe((res:any)=>{
      if(res.url){
        this.getuserDetails();
        this.getQuestion();
      }
    })
  }

  getuserDetails(){
    this._user.getUser().pipe(tap((res:any)=>{
      if(res){
        // console.log(res)
        this.userDetails = res
        // console.log(this.userDetails);
      }
    }),
    catchError((err:any)=>{
      return throwError(()=> err)
    })
    ).subscribe();
  }

  getQuestion(){
    let userData = localStorage.getItem("users")
    let user = userData && JSON.parse(userData)[0]
    let id = user.id
    console.log(id);
      this._que.getQuestionByUserid(id).subscribe((res:any)=>{
        if(res && res.body){
          console.log(res.body);
        }
      })
  }

}
