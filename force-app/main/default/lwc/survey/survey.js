import { LightningElement, wire } from 'lwc';	


import QUESTION_FIELD from '@salesforce/schema/Question__c.Question__c';
import TYPE_FIELD from '@salesforce/schema/Question__c.Type__c';

import { getSObjectValue } from '@salesforce/apex';
import getQuestions from '@salesforce/apex/surveyController.getQuestions';
import createSurveyAnswers from '@salesforce/apex/surveyController.createSurveyAnswers';
import CHECKMARK from '@salesforce/resourceUrl/checkMark';


export default class Survey extends LightningElement {
    surveyId = '';
     questions = [];
     isLastQuestion = false;
     answers = [];
     question = {};
     counter=1;
     surveyCompleted = false;
     checkMark= CHECKMARK;
    // @wire(getQuestions) questions;
    // get questionTxt(){
    //     return  getSObjectValue(questions[0].data, QUESTION_FIELD);
    // }

    // get currentQuestion(){
    //     return this.questions[this.counter];
    // }

    connectedCallback(){
        console.log('component init');
        getQuestions()
        .then((data) => {
            console.log('retrived data');
            console.log(JSON.stringify(data));
            this.questions = data;
            this.question=this.questions[this.counter-1];
            this.surveyId = this.questions[0].Survey__c;
        })
        .catch(error => {
            console.log('error');
            console.log(JSON.stringify(error));
        });
    }

    goToNextQuestion(event){
        this.saveAnswer(event);
        console.log('event handler');
        console.log('question length: ',this.questions.length);
        console.log('counter: ',this.counter);
        if (this.counter<this.questions.length) {
            this.counter++;
            this.question=this.questions[this.counter-1];
            if (this.counter==this.questions.length) this.isLastQuestion=true;
        }  
    }

    saveAnswer(event){
        console.log('event from child');
        console.log(JSON.stringify(event));
        console.log(JSON.stringify(event.detail));
        let answer = event.detail.answer;
        this.answers.push(answer);
        console.log(JSON.stringify(this.answers));
        

    }
    sendAnswers(event){
        this.saveAnswer(event);
        let wrap = {};
        wrap.surveyId = this.surveyId;
        wrap.answersAsJson = JSON.stringify(this.answers);

        console.log('sendAnswers: ' + JSON.stringify(event));
        //send answers to sf object Survey_Answers__c
        let userAnswers=JSON.stringify(this.answers);
        console.log('wrap');
        console.log(JSON.stringify(wrap));
        createSurveyAnswers({surveyAns: wrap})
        .then((data) => {
            console.log('data sent');
            console.log(JSON.stringify(data));
            this.surveyCompleted = true;

        })
        .catch(error => {
            console.log('error');
            console.log(JSON.stringify(error));
        });
        //and show thank you for submission
    }
}