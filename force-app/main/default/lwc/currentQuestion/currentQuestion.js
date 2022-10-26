import { LightningElement, api, track } from 'lwc';

export default class CurrentQuestion extends LightningElement {
    @api getQuestionFromSurvey;
    @api counter;
    @api isLastQuestion;
    isShowInfo=false;
    respondToParent = {};
    answer = 'none';
    @track value = '';
    start=new Date();
    stop=0;
    stopRM=0;
    time=0;
    @track options=[
            { label: 'Tak', value: 'yes' },
            { label: 'Nie', value: 'no' }
        ];

    @ track optionsGen=[
        { label: 'Kobieta', value: 'kobieta' },
        { label: 'Mężczyzna', value: 'mezczyzna' },
        { label: 'Inna', value: 'inna' }
    ];
    @ track optionsEdu =[
        { label: 'Wyższe', value: 'wyzsze' },
        { label: 'Średnie', value: 'srednie' },
        { label: 'Zawodowe', value: 'zawodowe' },
        { label: 'Podstawowe', value: 'podstawowe' }
    ];
    // handleChangeCon(event){
    //     console.log(JSON.stringify(event.detail));
    //     this.value = event.detail.value;
    //     this.answer = event.detail;
    //     this.respondToParent.answer = event.detail;
    // }
    handleChange(event){
        console.log(JSON.stringify(event.detail));
        this.value = event.detail.value;
        this.answer = event.detail;
        this.respondToParent.answer = event.detail;
        this.respondToParent.answer.questionName = this.getQuestionFromSurvey.Name;
    }
    handleAgeChange(event){
        console.log(JSON.stringify(event.detail));
        this.value = event.detail.value;
        this.answer = event.detail;
        this.respondToParent.answer = event.detail;
        this.respondToParent.answer.questionName = this.getQuestionFromSurvey.Name;
    }

    get disableButton(){
        return this.answer === 'none';
    }

    get isUserData(){
        return this.getQuestionFromSurvey.Type__c === 'Dane';
    }
    get genderQuestion(){
        return this.getQuestionFromSurvey.Name === 'Gender';
    }
    get ageQuestion(){
        return this.getQuestionFromSurvey.Name === 'Age';
    }
    get EducationQuestion(){
        return this.getQuestionFromSurvey.Name === 'Education';
    }
    get isInteractiveBoard(){
        return this.getQuestionFromSurvey.Type__c === 'Interaktywna plansza';
    }
    showInfo(event){
        this.isShowInfo=true;
        this.stopRM=new Date();
        
    }
    get additionalInfo(){
        return this.getQuestionFromSurvey.Additional_Information__c ? this.getQuestionFromSurvey.Additional_Information__c : '';
    }

    nextClick(event) {
        // console.log('nextClick1 ' + this.value);
        this.value = undefined;
        // console.log('nextClick2 ' + this.value);
        this.options = [];

        this.options = [
            { label: 'Tak', value: 'yes' },
            { label: 'Nie', value: 'no' }
        ];

        this.assignAnswersProperties();
        console.log('dispatch event: ' + JSON.stringify(this.respondToParent));
        const nextQuestionEvent = new CustomEvent("gotonextquestion", {
            detail: this.respondToParent
       });
       this.dispatchEvent(nextQuestionEvent);
       this.isShowInfo=false;
       this.answer = 'none';
       this.conData = 'none';
    }

    finishClick(event){
        this.assignAnswersProperties();
        const sendAnswersEvent = new CustomEvent("sendanswers", {
            detail: this.respondToParent
        });
        this.dispatchEvent(sendAnswersEvent);
    }
    
    timer(){
        this.stop=new Date();
        this.time=this.stop-this.start;
        this.start=new Date();
        return this.time;
        console.log('Answer time', this.time);
    }
    timerRm(){
        let diff=this.stopRM-this.start;
        return diff;
    }
    assignAnswersProperties(){
        if (this.isShowInfo) {
            this.answer.timeRM=this.timerRm();
        }
        this.answer.readMore=this.isShowInfo; 
        this.answer.timeVal=this.timer();
        this.answer.questionId = this.getQuestionFromSurvey.Id;
    }
    
}