/**
 * Created by Pavel on 09.09.2019.
 */

({
    doInit: function(component, event, helper) {
        helper.getCardsList(component);
        console.log('1');
    },
    deleteCard: function(component, event, helper) {
        var delCard = event.getSource().get('v.value');
        console.log('delCard', delCard)
        if (delCard) {
            helper.deleteCard(component,delCard);
        }
    },
    newCard: function(component, event, helper) {
        var accId = event.getSource().get('v.value');
        console.log('accIdFROMCOM',accId);
        helper.newCard(component,accId);
    },
    payOrder: function (component, event, helper) {
        /*var payCardId = event.getSource().get('v.value');
        console.log('payCard', payCardId)
        console.log('fullCost', component.get('v.fullCost'))
        if (payCardId){
            helper.payOrder(component,payCardId,component.get('v.fullCost'));
        }*/
        var action = component.get('c.payOrder');
        console.log(action);
        var payCardId = event.getSource().get('v.value');
        console.log(payCardId);
        console.log(component.get('v.fullCost'));
        action.setParams({cardId : payCardId, totalCost : component.get('v.fullCost')});
        action.setCallback(this, function(actionResult) {
            console.log(actionResult.getState());
        });
       // $A.enqueueAction(action);
    }
});