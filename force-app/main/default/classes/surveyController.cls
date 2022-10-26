public with sharing class surveyController {
    @AuraEnabled(cacheable=true)
    public static List<Question__c> getQuestions(){
        return [
            SELECT Id, Name, Active__c, Additional_Information__c, Type__c, Question__c, Step__c, Survey__c FROM Question__c
            WHERE Survey__r.Name='test'
            ORDER BY Step__c
        ];
    }

    @AuraEnabled
    public static List<Answer__c> createSurveyAnswers(SurveyAnswersWrapper surveyAns){
        Account acc = [SELECT Id FROM Account WHERE Name='Ankieta' LIMIT 1];
        System.debug('invoke createSurveyAnswers' + surveyAns);
        List<AnswerWrapper> answers = (List<AnswerWrapper>)JSON.deserialize(surveyAns.answersAsJson, List<AnswerWrapper>.class);
        List<Answer__c> ansToInsert = new List<Answer__c>();

        //  Survey_Answers__c surveyAnswers= new Survey_Answers__c();
        //  surveyAnswers.User_answers__c=surveyAns.answersAsJson;
        //  surveyAnswers.Survey__c=surveyAns.surveyId;
        //  surveyAnswers.User__c = UserInfo.getUserId();

        // try {
        //     insert surveyAnswers;
        // }
        // catch (Exception exp) {
        //     throw new AuraHandledException(exp.getMessage());
        // }
        Contact contact = new Contact();
        contact.LastName = 'User';
        contact.AccountId=acc.Id;

         try {
            insert contact;
        }
        catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
        for(AnswerWrapper ans: answers){
            if (ans.questionName != 'Education' && ans.questionName != 'Gender' && ans.questionName != 'Age') {
                Answer__c answer = new Answer__c();
                answer.Answer__c = ans.value;
                answer.Question__c = ans.questionId;
                answer.Contact__c = contact.Id;
                // answer.Survey_Answers__c = surveyAnswers.Id;
                answer.Time__c = ans.timeVal;
                answer.Read_More__c=ans.readMore;
                answer.Read_More_Time__c=ans.timeRM;
                ansToInsert.add(answer);
            }
            else if (ans.questionName == 'Gender') {
                contact.Gender__c=ans.value;
            }
            else if (ans.questionName == 'Age') {
                contact.Age__c=Integer.valueof(ans.value);
            }
            else    contact.Education__c =ans.value;
        }

        insert ansToInsert;
        update contact;
        return ansToInsert;
    }


    // public static List<Answer__c> createAnswers(List<Answer__c> answers){
    //     for (Answer__c answer : answers){
    //         answer.Answer__c='yes';
    //         answersList.add(answer);
    //     }
    //     try {
    //         insert answersList;
    //         return answersList;
    //     }
    //     catch (Exception exp) {
    //         throw new AuraHandledException(exp.getMessage());
    //     }
        
    // }

    class SurveyAnswersWrapper{
        @AuraEnabled
        public String answersAsJson {get;set;}
        @AuraEnabled
        public String surveyId {get;set;}
    }

    class AnswerWrapper {
        public String value {get;set;}
        public String readMore {get;set;}
        public Integer timeVal {get;set;}
        public Integer timeRM {get;set;}
        public String questionId {get;set;}
        public String education {get;set;}
        public Integer age {get;set;}
        public String gender {get;set;}
        public String questionName {get;set;}
    }
    // class ContactWrapper{
    //     public String education {get;set;}
    //     public Integer age {get;set;}
    //     public String gender {get;set;}
    // }       
}