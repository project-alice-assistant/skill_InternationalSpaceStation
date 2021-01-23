class InternationalSpaceStation_WhosAboard {
	constructor(uid) {
		this.uid = uid
		this.myDiv = document.querySelector(`[data-ref="WhosAboard_astronaut_list_${this.uid}"]`)
		this.update()
	}

	update() {
		const self = this
		fetch('http://api.open-notify.org/astros.json')
			.then((r) => r.json())
			.then((data) => {
				data['people'].forEach(element => {
					const li = document.createElement('li')
					li.innerHTML = `<span class="fa-li"><i class="fas fa-user-astronaut"></i></span>${element['name']}`
					self.myDiv.appendChild(li)
				})
				setTimeout(this.update.bind(this), 60*60*1000)
			})
			.catch((e) => {
				console.warn('Failed fetching astronaut data')
				setTimeout(this.update.bind(this), 60*1000)
			})
	}
}
