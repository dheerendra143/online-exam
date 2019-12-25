import { Component } from '@angular/core';
import { element } from 'protractor';
import questionJSONList from '../app/files/question_list.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cricket Trivia';
  graphDisplayStatus = false;
  selectedAnswerQuestionID=[];
  selectedAnswerList=[];
  question_list = questionJSONList;
  selectedValue=[];
  dataSource: Object;
  chartConfig: Object;
  myform:any;

  constructor() {
    this.chartConfig = {
       width: '100%',
       height: '400',
       type: 'column2d',
       dataFormat: 'json',
   };

   this.dataSource = {
       "chart": {
         "caption": this.title + "Graph",
         "subCaption": "",
         "xAxisName": "Selected Answer  ",
         "yAxisName": "Number of Question",
         "numberSuffix": "",
         "theme": "fusion",
       },
       "data": [{
         "label": "Correct  ",
         "value": 0
       }, {
         "label": "Incorrect",
         "value": 0
       }]
     };
    }
  
  displayGraph(rightAnswer,wrongAnswer){
    this.dataSource = {
      "chart": {
        "caption": this.title + " Graph",
        "subCaption": "",
        "xAxisName": "Selected Answer  ",
        "yAxisName": "Number of Question(s)",
        "palettecolors": "008000,ff0000",
        "formatNumber": "0"
      },
      "data": [{
        "label": "Correct  ",
        "value": rightAnswer
      }, {
        "label": "Incorrect",
        "value": wrongAnswer
      }]
    };
  }

  saveSelectedOption (list, event){
    let value = event.target.value.toLowerCase();
    let answer = list.answer.toLowerCase();

    let idx = this.selectedAnswerQuestionID.indexOf(list.question_id);
    let mainListIdx = this.question_list.indexOf(list);
   


    if(idx >= 0){
      this.selectedAnswerList.forEach(element => {
        if(element.question_id == list.question_id){
          element.selected_answer = value;
        }
      });

    }else {
      this.selectedAnswerList.push({"question_id": list.question_id, "answer": answer , "selected_answer": value});
      this.selectedAnswerQuestionID.push(list.question_id);
      this.question_list[mainListIdx].isSelected = "selected";
    }
  
    
    
    //console.log("jhjgfh", this.selectedAnswerQuestionID);
    
  }

  saveAllAnswer(){
    this.graphDisplayStatus = true;
    this.question_list.forEach(element => {
      if(this.selectedAnswerQuestionID.indexOf(element.question_id) == -1){
        element.isSelected = "error";
      }
    });
    let rightAnswer = 0;
    let wrongAnswer = 0;
    this.selectedAnswerList.forEach(element => {
      if(element.answer == element.selected_answer){
        rightAnswer++;
      }else{
        wrongAnswer++;
      }
    });
    console.log(this.selectedAnswerList);
    
    this.displayGraph(rightAnswer, wrongAnswer);
  }

  
  clearAllAnswer(){
    location.reload(); 
  }
}
