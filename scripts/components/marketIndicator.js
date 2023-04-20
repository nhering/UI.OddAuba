class MarketIndicator {
   #loading = true
   #dateString = ""
   #close = 0
   #high = 0
   #last = 0
   #intervalId = 0
   constructor() {
      this.init()
   }

   init() {
      let statusEle = document.getElementById("market-indicator")
      statusEle.innerHTML = null
      statusEle.appendChild(this.title)
      statusEle.appendChild(this.info)
   }

   get todayDateString()
   {
      let now = new Date(Date.now())
      let yyyy = now.getFullYear().toString()
      let mmm = this.getMonthAbr(now.getMonth()-1)
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
      ele.innerText = "QQQ:"
      if (!this.#loading) {
         let span = document.createElement('span')
         span.innerText = this.#dateString
         ele.appendChild(span)
      }
      return ele
   }

   get info()
   {
      let ele = document.createElement('div')
      if (!this.#loading) {
         if (this.#close > 0) {
            ele.appendChild(this.closing)
         } else {
            ele.appendChild(this.current)
         }
      }
      return ele
   }

   get closing()
   {
      let ele = document.createElement('div')
      ele.innerText = "Closed at "
      ele.appendChild(this.getDollarSpan(this.#close))
      return ele
   }

   get current()
   {
      let ele = document.createElement('div')

      let highSpan = document.createElement('span')
      highSpan.innerText = "High"
      highSpan.appendChild(this.getDollarSpan(this.#high))
      ele.appendChild(highSpan)

      let lastSpan = document.createElement('span')
      lastSpan.innerText = "Last"
      lastSpan.appendChild(this.getDollarSpan(this.#last))
      ele.appendChild(lastSpan)
      
      percentSpan.innerText = "Gap"
      percentSpan.appendChild(this.getPercentSpan(this.#high,this.#last))
      ele.appendChild(percentSpan)
      return ele
   }

   getDollarSpan(num)
   {
      let span = document.createElement('span')
      span.style.color = "#DDD"
      span.innerText = `$${num}`
      return span
   }

   getPercentSpan(high,last)
   {
      if (high <= last) return "0%"
      let dif = high - last
      let pcnt = dif / high
      return `${pcnt * 100}%`
   }

   async update() {
      this.#seconds--
      if (this.#seconds < 1) {
         await this.load()
      }
   }

   async load() {
      await funtilityApi.GET("oddauba/marketstate")
      .then((resp) => {
         // console.log(resp)
         var ms = resp.result
         // this.#name = ms.name
         // this.#code = ms.code
         // this.#isOpen = ms.isOpen
         // if (this.#isOpen)
         // {
         //    this.#seconds = ms.secondsTillClose
         // } else {
         //    this.#seconds = ms.secondsTillOpen
         // }
         // this.#refreshCountDown = 300
         if (this.#intervalId != 0) {
            clearInterval(this.#intervalId)
         }
         this.#intervalId = setInterval(async () => {
            await this.update()
         },60000)
      })
   }
}