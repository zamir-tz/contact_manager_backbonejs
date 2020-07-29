import { Contact } from "../models/contact.js";

var Contacts = Backbone.Collection.extend({
    model: Contact,
    initialize: function() {
    },
    parse: function(resp) {
        for (let obj in resp){
            this.add(resp[obj])
        }
    }
});


export {Contacts};