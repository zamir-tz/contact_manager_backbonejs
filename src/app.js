import { Contacts } from './collections/contacts.js';
import { Contact } from './models/contact.js';
import {ContactView} from './views/contactView.js'
import { ContactsView } from './views/contactsView.js';
import { saveAvatar, saveContacts, readContacts } from './localStorage/localStorage.js';

var contacts = new Contacts();
var contactsView = new ContactsView(contacts);
contacts.parse(readContacts());

document.getElementById("newContact").addEventListener('submit', async (e) => {
    e.preventDefault();
    
    var contact = new Contact({
        lastName: document.querySelector(".lastname-input").value,
        firstName: document.querySelector(".firstname-input").value,
        email: document.querySelector(".email-input").value,
        phone: document.querySelector(".phone-input").value,
    });
    if (document.getElementById("avatarUpload").files[0]) {
        await saveAvatar(contact.get("guid") ,document.getElementById("avatarUpload"));
        contact.set("avatar", window.localStorage.getItem("avatar-" + contact.get("guid")));
    }
    document.getElementById("newContact").reset();
    contacts.add(contact);
});

window.onunload = () => saveContacts(contacts);

export {contacts, contactsView};