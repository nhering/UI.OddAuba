class Ticker {
   #loading = true
   #name = "NYSE"
   #code = "XNYS"
   #isOpen = false
   #seconds = 0
   #refreshCountDown = 300
   #intervalId = 0
   constructor() {
      this.init()
   }

   init() {
      let statusEle = document.getElementById("market-status")
      statusEle.innerHTML = null
      statusEle.appendChild(this.openOrClosed)
      statusEle.appendChild(this.timer)
   }

   get openOrClosed()
   {
      let ele = document.createElement('div')
      ele.innerText = `${this.#name} `
      if (!this.#loading) {
         let span = document.createElement('span')
         if (this.#isOpen) {
            span.innerText = "OPEN"
            span.style.color = "#479c55"
         } else {
            span.innerText = "CLOSED"
            span.style.color = "#ca3434"
         }
         ele.appendChild(span)
      }
      return ele
   }

   get timer() {
      let ele = document.createElement('div')
      if (!this.#loading) {
         if (this.#isOpen) {
            ele.innerText = "Closes "
         } else {
            ele.innerText = "Opens "
         }
         ele.appendChild(this.timerSpan)
      }
      return ele
   }

   get timerSpan() {
      let span = document.createElement('span')
      span.id = 'timer-span'
      let hh = `${this.countDownHours}`.padStart(2,"0")
      let mm = `${this.countDownMinutes}`.padStart(2,"0")
      let ss = `${this.countDownSeconds}`.padStart(2,"0")
      span.innerText = `${hh}:${mm}:${ss}`
      return span
   }

   get countDownHours() {
      let hours = this.#seconds / 3600
      if (hours >= 1) return Math.floor(hours)
      return 0
   }

   get countDownMinutes() {
      let hours = this.countDownHours * 3600
      let minutes = (this.#seconds - hours) / 60
      if (minutes >= 1) return Math.floor(minutes)
      return 0
   }

   get countDownSeconds() {
      let hours = this.countDownHours * 3600
      let minutes = this.countDownMinutes * 60
      return this.#seconds - hours - minutes
   }

   async update() {
      this.#seconds--
      this.#refreshCountDown--
      if (this.shouldReload) {
         await this.load()
      } else {
         this.init()
      }
   }

   get shouldReload()
   {
      if (this.#seconds <= 0 || this.#refreshCountDown <= 0) return true
      return false
   }

   async load() {
      this.#loading = true
      this.init()
      await funtilityApi.GET("oddauba/marketstate")
      .then((resp) => {
         this.#loading = false
         var ms = resp.result
         this.#name = ms.name
         this.#code = ms.code
         this.#isOpen = ms.isOpen
         if (this.#isOpen)
         {
            this.#seconds = ms.secondsTillClose
         } else {
            this.#seconds = ms.secondsTillOpen
         }
         this.#refreshCountDown = 300
         if (this.#intervalId != 0) {
            clearInterval(this.#intervalId)
         }
         this.#intervalId = setInterval(async () => {
            await this.update()
         },1000)
      })
   }
}