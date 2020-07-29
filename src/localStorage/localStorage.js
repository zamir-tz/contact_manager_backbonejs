 const saveAvatar = async (guid, avatarHTML) => {
    if(avatarHTML.files[0]){
        window.localStorage.setItem("avatar-" + guid, await toBase64(avatarHTML.files[0]));
    }

}

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const elem = document.createElement('canvas');
            elem.height = elem.width * (img.height /img.width);
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, elem.width, elem.height);
            console.log(ctx.canvas.toDataURL('image/png', 0.5));
            resolve(ctx.canvas.toDataURL());
    };
    reader.onerror = (error) => reject(error);
}});

const saveContacts = (contacts) => {
        window.localStorage.setItem("contacts", JSON.stringify(contacts));
}

const readContacts = () => {
    if (window.localStorage.getItem('contacts')) {
        return JSON.parse(window.localStorage.getItem('contacts'));
    }
}

export {saveAvatar, saveContacts, readContacts}