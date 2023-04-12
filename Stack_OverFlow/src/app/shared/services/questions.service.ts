import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addQuestion } from 'src/model/data_types';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  //#region 
  baseUrl = environment.baseUrl;
  user = environment.user;
  addQuestion = environment.addQuestion;
  constructor(
    private http:HttpClient
  ) { }

  addQuestionByUserId(data:addQuestion){
    try {
      return this.http.post(this.baseUrl + this.addQuestion, data, {observe:'response'})
    } catch (error) {
      return throwError(()=> error)
    }
  }

  getAllQuestion(){
    try {
      return this.http.get(this.baseUrl + this.addQuestion,{observe:'response'})
    } catch (error) {
      return throwError(()=> error)
    }
  }
  getQuestionByUserid(id:number){
    try {
      return this.http.get(this.baseUrl + this.addQuestion +`?userId=${id}`,{observe:'response'})
    } catch (error) {
      return throwError(()=> error)

    }
  }
}
