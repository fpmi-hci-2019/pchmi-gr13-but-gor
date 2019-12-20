/**
 * Created by Pavel on 09.09.2019.
 */

public with sharing class PaymentforgoodsController {
    @AuraEnabled
    public static List <Account_Card__c> getCards(String accId) {
        return [
                SELECT  Card_Id__c,
                        Card_Id__r.Name,
                        Card_Id__r.CardNumber__c,
                        Card_Id__r.Cash__c
                FROM    Account_Card__c
                WHERE   AccountId__c =: accId];
    }
    @AuraEnabled
    public static void delCard(String cardId){
        System.debug('cardId: ' + cardId);
        Database.delete(cardId);
    }
    @AuraEnabled
    public static void payOrder(String cardId,Integer totalCost){
        System.debug('cardId: ' + cardId);
        System.debug('totalCost: ' + totalCost);
        /*Card__c card = [SELECT Cash__c FROM Card__c WHERE Id =: cardId];
        System.debug('card: ' + card);
        if(card.Cash__c >= totalCost){
            card.Cash__c -= totalCost;
            update card;
        }*/
    }
}