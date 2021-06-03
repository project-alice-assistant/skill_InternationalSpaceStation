class InternationalSpaceStation_WorldMap {
	constructor(uid) {
		this.uid = uid
		this.map = document.querySelector(`[data-ref="WorldMap_map_${this.uid}"]`)
		this.aliceSettings = JSON.parse(window.sessionStorage.aliceSettings);
		this.map.style.backgroundImage = `url("http://${this.aliceSettings['aliceIp']}:${this.aliceSettings['apiPort']}/api/v1.0.1/widgets/resources/img/InternationalSpaceStation/worldmap.gif")`
		this.satellite = document.querySelector(`[data-ref="WorldMap_satellite_${this.uid}"]`)
		this.counter = 0
		this.positionISS()
	}

	positionISS() {
		const self = this
		fetch('http://api.open-notify.org/iss-now.json')
			.then((r) => r.json())
			.then((data) => {
				const latitude = parseFloat(data['iss_position']['latitude'])
				const longitude = parseFloat(data['iss_position']['longitude'])
				const x = self.map.offsetWidth / 360 * (longitude + 180)
				const y = self.map.offsetHeight / 180 * (-latitude + 90)

				self.satellite.style.top = `${y - 12}px`
				self.satellite.style.left = `${x - 12}px`
				self.satellite.style.display = 'inline-block'

				self.counter += 1
				if (self.counter >= 5) {
					const marker = document.createElement('div')
					marker.className = 'WorldMap_dots'
					marker.innerHTML = '&#8226;'
					marker.style.top = `${y - 9}px`
					marker.style.left = `${x - 3}px`
					self.map.appendChild(marker)

					if (document.querySelectorAll('.WorldMap_dots').length > 1000) {
						document.querySelector(':nth-child(2)').remove()
					}
					self.counter = 0
				}

				setTimeout(this.positionISS.bind(this), 5000)
			})
			.catch((e) => {
				console.warn(`Failed fetching ISS position data: ${e}`)
				setTimeout(this.positionISS.bind(this), 5000)
			})
	}
}
