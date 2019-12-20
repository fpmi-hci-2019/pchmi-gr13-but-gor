/**
 * Created by Pavel on 09.09.2019.
 */

({
    getCardsList: function(component) {
        var accId = component.get('v.accountId');
        var action = component.get('c.getCards');
        action.setParams({
            accId : accId
        });
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            component.set('v.cards', actionResult.getReturnValue());
            //console.log('actionResult.getReturnValue()',actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    newCard: function (component,accId) {
        console.log('accIdFrom1:', accId);
        $A.createComponent(
            'c:NewCard',
            {
                accID : accId
            },
            function(newComponent, status, errorMessage){
                console.log('status1com:', status);
                console.log('accIdFrom2:', accId);
                if (status === 'SUCCESS') {
                    var body = component.find('NewCard');
                    body.set("v.body", newComponent);
                }
                else if (status === 'INCOMPLETE') {
                    console.log('No response from server or client is offline.')
                }
                else if (status === 'ERROR') {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    deleteCard:function (component,cardId) {
        var action = component.get('c.delCard');
        console.log('Action',action);
        action.setParams({
            cardId: cardId
        });                 
        action.setCallback(this, function(actionResult) {
            console.log(actionResult.getState());
        } );
        //     console.log(state);
        //     console.log('actionResult.getReturnValue()',actionResult.getReturnValue());
        //     component.set('v.cards', actionResult.getReturnValue());
        // });
        console.log('AftherDelet');
        $A.enqueueAction(action);
    },
    payOrder:function (component,cardId,fullCost) {
        var action = component.get('c.payOrder');
        console.log('payaction',action);
        console.log('cardIdpayy',cardId);
        console.log('fullCostpay',fullCost);
        action.setParams({
            cardId : cardId,
            totalCost : fullCost
        });
        console.log('------------------1');
        console.log('------------------action',JSON.stringify(action));
        // action.setCallback(this, function(actionResult) {
        //      component.set('v.cards', actionResult.getReturnValue());
        //     // var state = actionResult.getState();
        //      console.log('------------------state');
        //     // console.log('------------------2');
        //     // console.log('actionResult.getReturnValue()PAY',actionResult.getReturnValue());
        //     // component.set('v.cards', actionResult.getReturnValue());
        //     // console.log('-----------------3');
        //  });
        action.setCallback(this, function(actionResult) {
            console.log(actionResult.getState());
        });
        console.log('lastsetcalback');
        $A.enqueueAction(action);
    }
});