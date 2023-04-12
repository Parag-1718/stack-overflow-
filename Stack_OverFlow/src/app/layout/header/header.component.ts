import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userName:string = ''
  menuType:string ='normal'
  constructor(
    private _user:UserAuthService,
    private router:Router
  ){}
  ngOnInit(){
    // this.showuserName()
    this.router.events.subscribe((res:any)=>{
    
      if(res.url){
        if(localStorage.getItem('users')){
            this.menuType = 'user'
            this.showuserName()
        }
        else{
          this.menuType = 'normal'
        }
      }    
    })
   
  }

  showuserName(){
    let userData = localStorage.getItem("users")
    let user = userData && JSON.parse(userData)[0]
    let username = user.displayname
    // console.log(username);
    this.userName = username
    // console.log(this.userName);
  }

  logout(){
    localStorage.removeItem('users')
    this.menuType = 'normal'
  }
}
