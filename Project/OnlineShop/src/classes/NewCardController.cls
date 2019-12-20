/**
 * Created by Pavel on 11.09.2019.
 */

public with sharing class NewCardController {
    @AuraEnabled
    public static void saveCard(SObject card,String accId) {
        System.debug('The value is: ' + card);
        System.debug('The value is: ' + accId);
        try {
            //insert (Card__c)JSON.deserialize(card, Card__c.class);
            insert card;
            //Card__c cardObject = (Card__c)JSON.deserialize(card, Card__c.class);
            Account_Card__c newAccountCard = new Account_Card__c(Card_Id__c = card.Id,AccountId__c = accId);
            insert newAccountCard;
        }
        catch(DMLException e){
            throw new AuraHandledException(e.getDMLMessage(0));
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }

}
}