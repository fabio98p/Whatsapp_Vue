document.addEventListener('DOMContentLoaded', function () {
	console.log('ciao ale');

	var root = new Vue(
		{
			el: '#root',
			data: {
				newMessage: '',
				searchContact: '',
				contactProfile: './assets/img/avatar_1.jpg',
				contactsArray: contacts,
			},
			methods: {
				//funzione che permette cose al click sul utente
				ChangeChat: function (contact) {
					//serve per cambiare la mainChat  al click
					for (let i = 0; i < this.contactsArray.length; i++) {
						this.contactsArray[i].visible = false;
					}
					//serve per cambiare la profileConversator  al click
					contact.visible = true

				},
				//funzione che inizia premendo l'invio ovverso spedendo il messaggio
				sendingMessage: function () {
					//per la chat che é attualmente la main
					let index = this.contactsArray.filter((e) => e.visible == true)
					var d = new Date();

					//aggiunge all'array un nuovo elemento con la sua data, il contenuto
					//che era all'interno dell input, e lo status
					if (this.newMessage) {
						index[0].messages.push({
							date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
							text: this.newMessage,
							status: 'sent'
						})
					}

					//richiamo della funzione che risponde a sua volta al mio messaggio
					this.newMessage = ''
					this.reply()
				},
				//funzione di risposta che ha lo stesso principio della precedente solo che
				//quello che la fa partire e' un setTimeout
				reply: function () {
					let index = this.contactsArray.filter((e) => e.visible == true)
					var d = new Date();

					setTimeout(() => {
						index[0].messages.push({
							date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
							text: 'ok?',
							status: 'received'
						})
					}, 1000)
				},

				//
				
				// classica funzione random
				random: function (min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				},
				
				//funzione di prova per testare le cose (premere sui 3 pallini del menu nella sidebar)
				array: function () {
					console.log('prova');
				},
				insertNameContact: function (e) {
					const p = this.searchContact.toLowerCase()
					if (p == '') return true
					return e.name.toLowerCase().includes(p)
				},
				
			},
			computed: {
				// questa funzione serve unicamente a far salire in alto le conversazioni
				//con come ultimo messaggio il piu recente e ordinarle a loro volta
				intOrderedArray: function () {
					// ordinamento elementi per data dell'ultimo messaggio
					const dateForSort = []
					const datePreSorted = []
					this.contactsArray.forEach((e) => {
						const actualDate = e.messages[e.messages.length - 1].date
						const splited = actualDate.split(' ')
						const dateConverted = new Date(`${splited[0].split('/')[1]}/${splited[0].split('/')[0]}/${splited[0].split('/')[2]} ${splited[1]}`) 
						datePreSorted.push(dateConverted)
						dateForSort.push(dateConverted)
					});

					dateForSort.sort()

					// creazione ordenedArray e inserimento del ordinamento fatto in precedenza
					//non riesce a trovare la data perche e' pure stata cambiata
					var ordenedArray = []
					for (let indexElementSorted = 0; indexElementSorted < dateForSort.length; indexElementSorted++) {
						this.contactsArray.forEach((e,indexElementUnsorted) => {		
							if (datePreSorted[indexElementUnsorted] == dateForSort[indexElementSorted]) {
								ordenedArray.push(e)
							}
						});
					}
					return ordenedArray
				}
			},
		}
	);
});
