import { Contact } from "../models/contact.js";
import { contactsView } from "../app.js";
import { saveAvatar } from "../localStorage/localStorage.js";

// View for one contact
var ContactView = Backbone.View.extend({
    model: new Contact(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.contacts-list-template').html());
    },
    events: {
       "click .edit-contact": "edit",
       "click .update-contact": "update",
       "click .cancel": "cancel",
       "click .delete-contact": "remove"

    },
    edit: function() {
        console.log('edit');
        $('.edit-contact').hide();
        $('.delete-contact').hide();
        this.$('.update-contact').show();
        this.$('.cancel').show();

        let lastName = this.$(".lastName").html();
        let firstName = this.$(".firstName").html();
        let email = this.$(".email").html();
        let phone = this.$(".phone").html();

        this.$(".avatar-show").html(`<div class="file btn btn-primary" style="position: relative; overflow: hidden;">
        Upload new avatar
        <input type="file" id="avatarUpdate" class="avatarUpdate" name="file" style="position: absolute; font-size: 50px; opacity: 0; right: 0; top: 0;">
        </div>`);
        this.$(".lastName").html('<input type="text" class="from-control lastName-update" value="' + lastName + '">');
        this.$(".firstName").html('<input type="text" class="from-control firstName-update" value="' + firstName + '">');
        this.$(".email").html('<input type="text" class="from-control email-update" value="' + email + '">');
        this.$(".phone").html('<input type="text" class="from-control phone-update" value="' + phone + '">');
        
    },
    update: async function() {
        
        let avatar;

        if (document.getElementById('avatarUpdate').files[0]){
            await saveAvatar(this.model.get('guid'), document.getElementById('avatarUpdate'));
            avatar = window.localStorage.getItem("avatar-" + this.model.get("guid"));
        } else {
            avatar = "placeholder.png";
        }

        this.model.set({
            lastName: $('.lastName-update').val(),
            firstName: $('.firstName-update').val(),
            email: $('.email-update').val(),
            phone: $('.phone-update').val(),
            avatar
        });
    },
    cancel: function() {
        contactsView.render();
    },
    remove: function() {
        if( this.model.get('avatar') !== "placeholder.png") {
            window.localStorage.removeItem('avatar-' + this.model.get('guid'));
        }
        
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

export {ContactView};