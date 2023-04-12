import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { addQuestion } from 'src/model/data_types';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  addQusetionFrom!:FormGroup
  tagNames:any
  
  constructor(
    private _question:QuestionsService,
    private toast:ToastrService
  ){}
  ngOnInit(){
    this.addQusetionFrom = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      body: new FormControl(null, [
        Validators.required,
      ]),
      tags: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  add(data:addQuestion){
    // console.log(data);
    let userData = localStorage.getItem("users")
    let user = userData && JSON.parse(userData)[0]
    let userId = user.id
      data.userId = userId
      data.tags = data.tags.toString().split(",")
      console.log(data);
    this._question.addQuestionByUserId(data).subscribe((res:any)=>{
      if(res && res.body){
        this.toast.success("Question added")
       
        this.addQusetionFrom.reset();
      }
    })
  }
}
