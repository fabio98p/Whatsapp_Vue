document.addEventListener('DOMContentLoaded', function () {
	var root = new Vue(
		{
			el: '#root',
			data: {
				indexMessage: null,
				newMessage: '',
				searchContact: '',
				//todo, all'inizio non mette l'immagine profilo corretta
				contactProfile: '',
				contactsArray: contacts,
			},
			methods: {
				//serve unicamente per abbreviare il codice nel html
				date: function (contact) {
					const lastMessage = contact.messages[contact.messages.length - 1].date.split(' ')[1]
					return `${lastMessage.split(":")[0]}:${lastMessage.split(":")[1]}`
				},
				//funzione che permette cose al click sul utente
				ChangeChat: function (contact) {
					//serve per mettere tutti i profili a visible false per poi
					//mettere quello cliccato su true, questo permette di 
					//capire quale mainChat visualizzare e tutte le cose del caso
					for (let i = 0; i < this.contactsArray.length; i++) {
						this.contactsArray[i].visible = false;
					}
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

				// classica funzione random
				random: function (min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				},

				insertNameContact: function (e) {
					const nameToLowercase = this.searchContact.toLowerCase()
					if (nameToLowercase == '') return true
					return e.name.toLowerCase().includes(nameToLowercase)
				},

				//funzione che serve a eliminare il messaggio
				removeMessage: function (contactIndex, messageIndex) {
					this.contactsArray[contactIndex].messages.splice(messageIndex, 1);
				},
				//funzione di prova per testare le cose (premere sui 3 pallini del menu nella sidebar)
				array: function (message, index) {
					console.log(this.contactsArray[this.contactsArray.length - 1].avatar);
				},
			},
			computed: {
				// questa funzione serve unicamente a far salire in alto le conversazioni
				//con come ultimo messaggio il piu recente e ordinarle a loro volta
				intOrderedArray: function () {
					console.log('computed');
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

					//creazione orderedArray che prende l'contactarray, lo fa ciclare
					//e se l'elemento precedentemente sortato ne confronta la data
					//dell'ultimo messaggio per capire quale elemento inserire nel
					//nuovo array ordinato

					var orderedArray = []
					for (let indexElementSorted = 0; indexElementSorted < dateForSort.length; indexElementSorted++) {
						this.contactsArray.forEach((e, indexElementUnsorted) => {
							if (datePreSorted[indexElementUnsorted] == dateForSort[indexElementSorted]) {
								orderedArray.push(e)
							}
						});
					}
					return orderedArray
				}
			},
			//questa funzione fa in modo che all'avviamento la prima chat
			//mostrata sia quella con l'ultimo messaggio scritto
			created: function () {
				var orderedArray = this.intOrderedArray
				this.contactProfile = `./assets/img/avatar${orderedArray[orderedArray.length - 1].avatar}.jpg`
				console.log(orderedArray.length, orderedArray[orderedArray.length - 1]);
				orderedArray.forEach((e, i) => {
					if (i == (orderedArray.length - 1)) {
						e.visible = true
					} else {
						e.visible = false
					}
				});
			}
		}
	);
});
