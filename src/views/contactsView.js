import { ContactView }  from "./contactView.js";

// View for contacts
var ContactsView = Backbone.View.extend({
    el: $('.contacts-list'),
    initialize: function (model) {
        this.model = model;
        this.model.on('add', this.render, this);
        this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);
    },
    render: function() {
        var that = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(contact) {
            that.$el.append((new ContactView({model: contact})).render().$el);
        });
        return this;
    },
});

export {ContactsView};