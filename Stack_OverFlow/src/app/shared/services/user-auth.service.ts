import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  //#region 
  baseUrl = environment.baseUrl;
  user = environment.user;
  constructor(
    private http:HttpClient
  ) { }

  signUp(data:any){
    try {
      return this.http.post(this.baseUrl + this.user, data, {observe:'response'})
    } catch (error) {
      return throwError(()=> error)
    }
  }
  
  login(data:any){
    try {
      return this.http.get(this.baseUrl + this.user + `?email=${data.email}&password=${data.password}`,{observe:'response'})
    } catch (error) {
      return throwError(()=> error)
    }
  }

  getUser(){
    let userData = localStorage.getItem("users")
    let user = userData && JSON.parse(userData)[0]
    try {
      return this.http.get(this.baseUrl + this.user + `/${user.id}`)
    } catch (error) {
      return throwError(()=> error)
    }
  }
}
