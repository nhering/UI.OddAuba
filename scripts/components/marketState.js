class MarketState {
   #loading = true
   #seconds = 0
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
      ele.innerText = 'NYSE '
      if (!this.#loading) {
         let span = document.createElement('span')
         if (state.marketState.isOpen) {
            span.innerText = "OPEN"
            span.style.color = "#50c156"
            span.style.fontSize = "14px"
         } else {
            span.innerText = "CLOSED"
            span.style.color = "#ff2525"
            span.style.fontSize = "14px"
         }
         ele.appendChild(span)
      }
      return ele
   }

   get timer() {
      let ele = document.createElement('div')
      if (!this.#loading) {
         if (state.marketState.isOpen) {
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
      span.style.fontSize = "14px"
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
      const now = new Date(Date.now())
      if (now > state.marketState.nextChange) {
         await this.load()
      } else {
         let x = now.getTime()
         let y = state.marketState.nextChange.getTime()
         var flt = Math.abs(x - y)/1000
         this.#seconds = Math.floor(flt)
         this.init()
      }
   }

   async load() {
      this.#loading = true
      this.init()
      await funtilityApi.GET("oddauba/marketstate")
      .then((resp) => {
         this.#loading = false
         state.marketState = resp
         if (this.#intervalId != 0) {
            clearInterval(this.#intervalId)
         }
         this.#intervalId = setInterval(async () => {
            await this.update()
         },1000)
      })
   }
}
