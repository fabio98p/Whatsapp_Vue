document.addEventListener('DOMContentLoaded', function () {
	console.log('ciao ale');

	var root = new Vue(
		{
			el: '#root',
			data: {
				newMessage: '',
				contactProfile: './assets/img/avatar_1.jpg',
				contactsArray: contacts,
			},
			methods: {
				//questa funzione serve per scrivere il nome completo dell url dell immagine
				img: function (contact) {
					contact
					return `./assets/img/avatar${contact.avatar}.jpg`
				},
				//funzione che permette cose al click sul utente
				ChangeChat: function (contact) {
					//serve per cambiare la mainChat  al click
					for (let i = 0; i < this.contactsArray.length; i++) {
						this.contactsArray[i].visible = false;
					}
					//serve per cambiare la profileConversator  al click
					contact.visible = true
					console.log(this);
					this.contactProfile = this.img(contact)
				},
				sendingMessage: function () {
					let index = this.contactsArray.filter((e) => e.visible == true)
					var d = new Date();

					console.log(d);
					if (this.newMessage) {
						index[0].messages.push({
							date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} 
							${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
							text: this.newMessage,
							status: 'sent'
						})
					}
					this.newMessage = ''

					this.reply()
				},
				reply: function () {
					let index = this.contactsArray.filter((e) => e.visible == true)
					var d = new Date();

					setTimeout(() => {
						index[0].messages.push({
							date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} 
							${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
							text: 'ok?',
							status: 'received'
						})
					}, 1000)
				},
				random: function (min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				},

				//funzione di prova per testare le cose (premere sui 3 pallini del menu nella sidebar)
				array: function () {
					// ordinamento elementi per data dell'ultimo messaggio
					const array = []
					this.contactsArray.forEach((e, i, a) => {
						array.push(e.messages[e.messages.length - 1].date)
					});
					array.sort()

					// creazione ordenedArray e inserimento del ordinamento fatto in precedenza
					var ordenedArray = []
					for (let i = 0; i < array.length; i++) {
						this.contactsArray.forEach(e => {		
							if (e.messages[e.messages.length - 1].date == array[i]) {
								ordenedArray.push(e)
							}
						});
					}
					console.log(this.contactsArray, ordenedArray);
				},

			},
			computed: {

			},
		}
	);
});