const loader = {
   intervalId: null,
   percent: 0,
   evenStyle: true,
   minDuration: 0,
   duration: 0,
   init()
   {
      if (this.intervalId != null) clearInterval(this.intervalId)
      this.intervalId = null
      let e = document.getElementById('loader')
      if (e) e.remove()
      this.percent = 0
      this.minDuration = 0
      this.duration = 0
   },
   show(minDuration = 0)
   {
      this.init()
      this.minDuration = minDuration
      let e = document.createElement('div')
      e.setAttribute('id','loader')
      this.intervalId = setInterval(() => {
         e.setAttribute('style', this.style)
         this.duration += 50
      },50)

      document.querySelector('body').appendChild(e)
   },
   error(msg = 'Error Loading') {
      if (this.intervalId != null) clearInterval(this.intervalId)
      let e = document.getElementById('loader')
      e.removeAttribute('style')
      e.style.backgroundColor = "#ce3333"
      e.innerText = msg
      this.duration = 0
      this.minDuration = 3000
      this.hide()
   },
   success(msg = 'Success!') {
      if (this.intervalId != null) clearInterval(this.intervalId)
      let e = document.getElementById('loader')
      e.removeAttribute('style')
      e.style.backgroundColor = "#51cc4b"
      e.innerText = msg
      this.duration = 0
      this.minDuration = 1500
      this.hide()
   },
   hide()
   {
      let d = this.minDuration - this.duration
      if (d > 0) {
         setTimeout(() => {
            this.init()
         }, d)
      } else {
         this.init()
      }
   },
   get style()
   {
      let s = ""
      if (this.percent >= 100) {
         this.percent = 0
         this.evenStyle = !this.evenStyle
      }
      this.percent += 5

      if (this.evenStyle)
      {
         s = `white ${this.percent}%, #006ec9 0%`
      } else {
         s = `#006ec9 ${this.percent}%, white 0%`
      }
      return `background:linear-gradient(90deg,${s})`
   }
}