class MarketIndicator {
   #loading = true
   #dateString = ""
   #close = 0
   #low = 0
   #high = 0
   #last = 0
   #intervalIds = []
   #progEle = null
   #progressCounter = 0
   constructor() {
      this.init()
   }

   init() {
      let statusEle = document.getElementById("market-indicator")
      statusEle.innerHTML = null
      statusEle.appendChild(this.title)
      statusEle.appendChild(this.info)
      if (state.marketState.isOpen) {
         this.#progressCounter = 0
         statusEle.appendChild(this.progressBar)
         statusEle.title = this.titleText
      }
   }

   get todayDateString()
   {
      let now = new Date(Date.now())
      let yyyy = now.getFullYear().toString()
      let mmm = this.getMonthAbr(now.getMonth())
      let DD = now.getDate().toString().padStart(2,'0')
      return `${mmm} ${DD} ${yyyy}`
   }

   getMonthAbr(i)
   {
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      return months[i]
   }

   get title()
   {
      let ele = document.createElement('div')
      ele.innerText = "QQQ "
      if (!this.#loading) {
         let span = document.createElement('span')
         span.innerText = this.#dateString
         span.style.fontSize = "14px"
         ele.appendChild(span)
      }
      return ele
   }

   get info()
   {
      let ele = document.createElement('div')
      if (!this.#loading) {
         if (state.marketState.isOpen) {
            ele.appendChild(this.last)
         } else {
            ele.appendChild(this.closing)
         }
      }
      return ele
   }

   get titleText()
   {
      return `High: $${this.#high.toFixed(2)}
Last: $${this.#last.toFixed(2)}
Low: $${this.#low.toFixed(2)}`
   }

   get closing()
   {
      let ele = document.createElement('div')
      ele.innerText = "Close: "
      ele.appendChild(this.getDollarSpan(this.#close))
      return ele
   }

   get last()
   {
      let ele = document.createElement('div')
      ele.innerText = "Last: "
      ele.appendChild(this.getDollarSpan(this.#last))
      ele.appendChild(this.infoIcon)
      return ele
   }

   get infoIcon()
   {
      let ele = document.createElement('span')
      ele.innerText = "i"
      ele.classList.add('info-icon')
      return ele
   }

   get progressBar()
   {
      if (this.#progEle == null) {
         this.#progEle = document.createElement('div')
         this.#progEle.classList.add('progress-bar-container')
      } else {
         this.#progEle.innerHTML = null
      }
      return this.#progEle
   }

   getDollarSpan(num)
   {
      let span = document.createElement('span')
      span.style.color = "#DDD"
      span.style.fontSize = "14px"
      span.innerText = `$${num.toFixed(2)}`
      return span
   }

   getPercentSpan(high,last)
   {
      let span = document.createElement('span')
      if (high <= last) {
         span.innerText = "0%"
      } else {
         let dif = high - last
         let pcnt = ( dif / high ).toFixed(2)
         span.innerText = `${pcnt * 100}%`  
      }
      return span
   }

   async updateMarketIndicator() {
      if (state.marketState.isOpen) {
         await this.load()
      }
   }

   updateProgressBar()
   {
      this.#progressCounter += 1000
      this.progressBar.innerHTML = null
      let progBar = document.createElement('div')
      progBar.classList.add('progress-bar')
      progBar.style.width = this.progressPercent
      this.progressBar.appendChild(progBar)
   }

   get progressPercent()
   {
      let divisor = 60000
      let dividend = divisor - this.#progressCounter
      if ( dividend <= 0 ) return '100%'
      let pct = ( 1 - ( dividend / divisor ) ).toFixed(2)
      return `${pct.substring(2)}%`
   }

   async load() {
      this.#loading = true
      await funtilityApi.GET("oddauba/marketindicator")
      .then((resp) => {
         var mi = resp.result
         this.#high = mi.high
         this.#low = mi.low
         this.#last = mi.last
         this.#close = mi.close
         if (state.marketState.isOpen) {
            this.#dateString = this.todayDateString
         } else {
            this.#dateString = mi.closeDate
         }
         this.clearIntervals()
         this.#intervalIds.push(setInterval(async () => {
            await this.updateMarketIndicator()
         },60000))
         this.#intervalIds.push(setInterval(() => {
            this.updateProgressBar()
         },1000))
         
         this.#loading = false
         this.init()
      })
   }

   clearIntervals()
   {
      this.#intervalIds.forEach(i => {
         clearInterval(i)
      })
   }
}
