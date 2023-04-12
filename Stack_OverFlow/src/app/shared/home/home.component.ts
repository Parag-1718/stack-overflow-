import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { addQuestion } from 'src/model/data_types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //#region 
  questions!:addQuestion[]
  constructor(
    private router:Router,
    private _question:QuestionsService
    ){}

  ngOnInit(){
    this.getQuestions();
  }

  gotoAdd(){
     this.router.navigate(['/module/user/add'])
  }

  getQuestions(){
    this._question.getAllQuestion().subscribe((res:any)=>{
      if(res && res.body){
        this.questions = res.body
        console.log(this.questions);
      }
    })
  }

}
