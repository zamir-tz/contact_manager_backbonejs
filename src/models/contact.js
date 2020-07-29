import { generateGuid } from "../utils/guidGenerator.js";

var Contact = Backbone.Model.extend({
    defaults: () => {
        return {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            avatar: "placeholder.png",
            guid: ""
        }
    },
    initialize: function() {
        this.set("guid", generateGuid());
    },
    
});

export { Contact };