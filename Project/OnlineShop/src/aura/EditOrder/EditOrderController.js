/**
 * Created by user on 09-Sep-19.
 */

({
    doInit: function (component, event, helper) {
        let action = component.get("c.getAccountById");
        let accId = component.get("v.AccountLogin_Id");
        action.setParams({
            AccId: accId
        });

        action.setCallback(this, function(response) {
            let fullCost = 0;
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.editAccount.Name", response.getReturnValue().Name);
                component.set("v.editAccount.Phone", response.getReturnValue().Phone);
                let receivedItems = JSON.parse(JSON.stringify(component.get("v.CatalogItems")));
                component.set("v.CatalogItems", receivedItems[0].CatalogItems);

                for (let i = 0; i < receivedItems[0].CatalogItems.length; i++) {
                    fullCost += receivedItems[0].CatalogItems[i].Quantity__c * receivedItems[0].CatalogItems[i].Cost__c;
                }
                component.set("v.fullCost", fullCost);
            } else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    saveAccInfo: function (component, event, helper) {
        let validAccount = component.find("accField").reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get("v.validity").valid;
        }, true);

        if (validAccount) {
            let editedAccount = component.get("v.editAccount");
            editedAccount.Id = component.get("v.AccountLogin_Id");
            helper.createAccount(component, editedAccount);
            component.set("v.isTruth", true);

            function fadeout() {
                document.getElementById("fadeout").style.opacity = "0";
                component.set("v.isTruth", false);
            }


            setTimeout(fadeout, 500);
        }
    },

    deleteRecord: function (component, event, helper) {
        let deleteItems = JSON.parse(JSON.stringify(component.get("v.deletedItems")));
        let fullCost = component.get("v.fullCost");
        let recId = event.getSource().get("v.value");
        let allRecs = JSON.parse(JSON.stringify(component.get("v.CatalogItems")));
        for(let i = 0; i < allRecs.length; i++) {
            if (allRecs[i].Id === recId) {
                fullCost -= (allRecs[i].Quantity__c * allRecs[i].Cost__c);
                deleteItems.push(allRecs.splice(i, 1));
                component.set("v.deletedItems", deleteItems);
                component.set("v.CatalogItems", allRecs);
                component.set("v.fullCost", fullCost);
            }
        }
    },

    makeOrder: function (component, event, helper) {
        /*$A.get("e.c:makeOrderEvent")*/
        let createEvent = $A.get("e.c:makeOrderEvent");
        console.log(createEvent);
        createEvent.setParams({
            "fullCost" : JSON.parse(JSON.stringify(component.get("v.fullCost"))),
            "Id" : JSON.parse(JSON.stringify(component.get("v.AccountLogin_Id")))
        });
        createEvent.fire();
        component.destroy();
    }
});