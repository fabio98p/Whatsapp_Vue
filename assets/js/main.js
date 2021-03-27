document.addEventListener('DOMContentLoaded', function () {
	console.log('ciao ale');

	var root = new Vue(
		{
			el: '#root',
			data: {
				contactsArray: contacts
			},
			methods: {
				//questa funzione serve per scrivere il nome completo dell url dell immagine
				img: function (contact) {
					return `./assets/img/avatar${contact}.jpg`
				},
				//funzione che permette di cambiare chat
				ChangeChat: function (contact) {
					for (let i = 0; i < this.contactsArray.length; i++) {
						this.contactsArray[i].visible = false;
					}
					contact.visible = true
				},
				//funzione di prova per testare le cose
				array: function () {

					console.log(this.contactsArray[1].messages[2].text);
				},
			},
			computed: {

			},
		}
	);
});