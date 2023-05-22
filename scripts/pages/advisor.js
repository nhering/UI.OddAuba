class TranchePage extends PageBase {
   constructor() {
      super("Advisor")
   }

   get element()
   {
      let h = document.querySelector('body').offsetHeight
      let e = document.createElement('div')
      e.classList.add('page-advisor')
      e.style.height = h
      e.appendChild(this.controls)
      e.appendChild(this.snapshotTable)
      e.appendChild(this.adviceTable)
      return e
   }

   //#region controls

   // Controls
   get controls()
   {
      let e = document.createElement('div')
      e.classList.add('controls')
      e.appendChild(this.trancheSelect)
      e.appendChild(this.navControls)
      return e
   }

   //#region Tranche Select

   /**
    * Holds metadata for the currently selected tranche.
    * @example { 
    *    trancheNumber: 0, 
    *    first: '2015-01-05T00:00:00', 
    *    prev: null,
    *    next: null,
    *    last: '2017-12-27T00:00:00',
    *    selected: '2017-12-27T00:00:00' 
    *    }
    */
   #navData = {}
   get trancheSelect()
   {
      let s = document.createElement('select')
      s.setAttribute('id', 'tranche-select')
      s.addEventListener('change', () => {
         let x = s.childNodes[s.selectedIndex]
         this.#navData = {
            trancheNumber: x.dataset.trancheNumber,
            first: x.dataset.beginDate,
            prev: null,
            next: null,
            last: x.dataset.endDate,
            selected: x.dataset.endDate
         }
         console.log(this.#navData);
         if (this.#navData.trancheNumber != 'undefined')
         {
            this.GET_adviceData()
         }
      })
      
      let opt = document.createElement('option')
      opt.setAttribute('value','')
      opt.innerHTML = "Select Tranche"
      s.appendChild(opt)
      return s
   }

   //#endregion

   //#region Tranch History Navigation

   get navControls()
   {
      let fs = document.createElement('div')
      fs.classList.add('nav')
      fs.appendChild(this.navLabel)
      fs.appendChild(this.navFirst)
      fs.appendChild(this.navPrev)
      fs.appendChild(this.navNext)
      fs.appendChild(this.navLast)
      return fs
   }

   get navLabel()
   {
      let lbl = document.createElement('div')
      lbl.classList.add('lbl')
      lbl.innerText = 'Transactions'
      return lbl
   }

   get navFirst()
   {
      let chev = document.createElement('div')
      chev.classList.add('chev')
      chev.innerText = '<<'

      let txt = document.createElement('div')
      txt.classList.add('txt')
      txt.innerText = 'FIRST'

      let e = document.createElement('div')
      e.classList.add('btn')
      e.classList.add('disabled')
      e.dataset.nav = 'prev'
      e.appendChild(chev)
      e.appendChild(txt);
      e.addEventListener('click',(event) =>
      {
         if (!event.target.parentElement.classList.contains('disabled'))
         {
            this.#navData.selected = this.#navData.first
            this.GET_adviceData()
         }
      })
      return e
   }

   get navPrev()
   {
      let chev = document.createElement('div')
      chev.classList.add('chev')
      chev.innerText = '<'

      let txt = document.createElement('div')
      txt.classList.add('txt')
      txt.innerText = 'PREV'

      let e = document.createElement('div')
      e.classList.add('btn')
      e.classList.add('disabled')
      e.dataset.nav = 'prev'
      e.appendChild(chev)
      e.appendChild(txt);
      e.addEventListener('click',(event) =>
      {
         if (!event.target.parentElement.classList.contains('disabled'))
         {
            this.#navData.selected = this.#navData.prev
            this.GET_adviceData()
         }
      })
      return e
   }

   get navNext()
   {
      let chev = document.createElement('div')
      chev.classList.add('chev')
      chev.innerText = '>'

      let txt = document.createElement('div')
      txt.classList.add('txt')
      txt.innerText = 'NEXT'

      let e = document.createElement('div')
      e.classList.add('btn')
      e.classList.add('disabled')
      e.dataset.nav = 'next'
      e.appendChild(chev)
      e.appendChild(txt);
      e.addEventListener('click',(event) =>
      {
         if (!event.target.parentElement.classList.contains('disabled'))
         {
            this.#navData.selected = this.#navData.next
            this.GET_adviceData()
         }
      })
      return e
   }

   get navLast()
   {
      let chev = document.createElement('div')
      chev.classList.add('chev')
      chev.innerText = '>>'

      let txt = document.createElement('div')
      txt.classList.add('txt')
      txt.innerText = 'LAST'

      let e = document.createElement('div')
      e.classList.add('btn')
      e.classList.add('disabled')
      e.dataset.nav = 'next'
      e.appendChild(chev)
      e.appendChild(txt);
      e.addEventListener('click',(event) =>
      {
         if (!event.target.parentElement.classList.contains('disabled'))
         {
            this.#navData.selected = this.#navData.last
            this.GET_adviceData()
         }
      })
      return e
   }

   /**
    * Disable a set of navigation controls.
    * FIRST & PREV - OR - NEXT & LAST
    * @param {string} dir [ prev | next ]
    */
   disableNav(dir)
   {
      let btns = document.querySelectorAll(`[data-nav="${dir}"`)
      btns.forEach(btn => { btn.classList.add('disabled')})
   }

   /**
    * Enable a set of navigation controls.
    * FIRST & PREV - OR - NEXT & LAST
    * @param {string} dir [ prev | next ]
    */
   enableNav(dir)
   {
      let btns = document.querySelectorAll(`[data-nav="${dir}"`)
      btns.forEach(btn => { btn.classList.remove('disabled')})
   }

   //#endregion

   //#endregion

   //#region SnapshotTable

   get snapshotTable()
   {
      let e = document.createElement('div')
      e.classList.add('snapshots')
      e.appendChild(this.snapshotHeader)
      e.appendChild(this.snapshotList)
      return e
   }

   get snapshotHeader()
   {
      let e = document.createElement('div')
      e.classList.add('header')

      let sym = document.createElement('div')
      sym.classList.add('col')
      e.appendChild(sym)

      let cur = document.createElement('div')
      cur.classList.add('col')
      cur.innerText = 'Current'
      let curDate = document.createElement('div')
      curDate.id = 'cur-date'
      curDate.innerText = '----------------'
      cur.appendChild(curDate)
      e.appendChild(cur)

      let ref = document.createElement('div')
      ref.classList.add('col')
      ref.innerText = 'Reference'
      let refDate = document.createElement('div')
      refDate.id = 'ref-date'
      refDate.innerText = '----------------'
      ref.appendChild(refDate)
      e.appendChild(ref)

      let pur = document.createElement('div')
      pur.classList.add('col')
      pur.innerText = 'Purchase'
      let purDate = document.createElement('div')
      purDate.id = 'pur-date'
      purDate.innerText = '----------------'
      pur.appendChild(purDate)
      e.appendChild(pur)

      let scrollSpacer = document.createElement('div')
      e.appendChild(scrollSpacer)

      return e
   }

   formatDateTimeForHeader(dateTime)
   {
      let dtNodes = dateTime.split('T')
      let date = dtNodes[0]
      let time = dtNodes[1]
      date.replace('-','/')
      let tNodes = time.split(':')
      let h = tNodes[0]
      let m = tNodes[1]
      let s = tNodes[2]
      return `${date} ${h}:${m}`
   }

   get snapshotList()
   {
      let e = document.createElement('div')
      e.classList.add('list')
      return e
   }

   /**
    * Returns a DOM element with the child elements containing the
    * information to show in the snapshot part of the page.
    * @param {obj} data {
    *    symbol: 'A',
    *    cur: 0.00,
    *    ref: 0.00,
    *    pur: 0.00
    * } 
    */
   createSnapshotListItem(data)
   {
      let item = document.createElement('div')
      item.classList.add('item')

      let sym = document.createElement('div')
      sym.classList.add('symbol')
      sym.innerText = data.sym
      item.appendChild(sym)

      let cur = document.createElement('div')
      cur.classList.add('price')
      cur.innerText = data.cur
      item.appendChild(cur)

      let ref = document.createElement('div')
      ref.classList.add('price')
      ref.innerText = data.ref
      item.appendChild(ref)

      let pur = document.createElement('div')
      pur.classList.add('price')
      pur.innerText = data.pur
      item.appendChild(pur)
      
      return item
   }

   formatPrice(price)
   {
      let nodes = new String(price).split('.')
      let int = nodes[0]
      let dec = nodes[1]
      return `${int}.${dec.padEnd(4,'0')}`
   }

   //#endregion

   //#region Advice

   get adviceTable()
   {
      let e = document.createElement('div')
      e.classList.add('advice')
      e.appendChild(this.adviceHeader)
      e.appendChild(this.adviceList)
      return e
   }

   get adviceHeader()
   {
      let e = document.createElement('div')
      e.classList.add('header')

      let sym = document.createElement('div')
      sym.classList.add('col')
      sym.id = 'owned-symbol'
      e.appendChild(sym)

      let rankHdr = document.createElement('div')
      rankHdr.classList.add('col')
      rankHdr.innerText = 'Rank'
      let rankNum = document.createElement('div')
      rankNum.id = 'rank'
      rankNum.innerText = '- - -'
      rankHdr.appendChild(rankNum)
      e.appendChild(rankHdr)

      let refHdr = document.createElement('div')
      refHdr.classList.add('col')
      refHdr.innerText = 'Ref Diff'
      let refNum = document.createElement('div')
      refNum.id = 'ref-diff'
      refNum.innerText = '- - -'
      refHdr.appendChild(refNum)
      e.appendChild(refHdr)

      return e
   }

   get adviceList()
   {
      let e = document.createElement('div')
      e.classList.add('list')
      return e
   }

   createAdviceListItem(data)
   {
      let e = document.createElement('div')
      e.classList.add('item')

      let s = document.createElement('div')
      s.classList.add('symbol')
      s.innerText = data.symbol
      e.appendChild(s)

      let r = document.createElement('div')
      r.classList.add('rank')
      r.innerText = data.rank
      e.appendChild(r)

      let d = document.createElement('div')
      d.classList.add('diff')
      d.innerText = this.formatRefDiff(data.refDiff)
      e.appendChild(d)

      let res = document.createElement('div')
      res.classList.add('restrict')
      data.restrictions.forEach(restrict => {
         let r = document.createElement('div')
         r.classList.add('tag')
         r.innerText = restrict.category
         r.title = restrict.createNote
         res.appendChild(r)
      })
      e.appendChild(res)

      return e
   }

   formatRefDiff(refDiff)
   {
      refDiff = refDiff * 100
      let nodes = new String(refDiff).split('.')
      let int = nodes[0]
      let dec = nodes[1]
      dec = dec.substring(0,4)
      return `${int}.${dec.padEnd(4,'0')}`
   }

   //#endregion

   //#region API Calls

   async load()
   {
      loader.show()
      Promise.all([this.GET_select()])
      .then(()=>{
         loader.hide()
      })
   }

   async GET_select()
   {
      await funtilityApi.GET("oddauba/advisor/select")
      .then((resp) => {
         console.log(resp)
         let select = document.getElementById('tranche-select')
         resp.result.forEach(item => {
            let opt = document.createElement('option')
            opt.setAttribute('value',item.trancheNumber)
            opt.innerHTML = `Tranche ${item.trancheNumber}`
            opt.dataset.trancheNumber = item.trancheNumber
            opt.dataset.beginDate = item.beginDate
            opt.dataset.endDate = item.endDate
            select.appendChild(opt)
         })
      })
   }

   async GET_adviceData()
   {
      loader.show()
      const params = [
         ["trancheNumber",this.#navData.trancheNumber],
         ["dateTime",this.#navData.selected]
      ]
      await funtilityApi.GET("oddauba/advisor/adviceView",params)
      .then((resp) => {
         document.querySelectorAll(".list .item").forEach(i => i.remove())
         console.log(resp.result)
         const view = resp.result
         
         this.#navData.prev = view.prevDateTime
         if(view.prevDateTime != null) {
            this.enableNav('prev')
         } else {
            this.disableNav('prev')
         }

         this.#navData.next = view.nextDateTime
         if(view.nextDateTime != null) {
            this.enableNav('next')
         } else {
            this.disableNav('next')
         }

         // console.log(view.advice.tranche.currentSnapshot)
         let curSnap = view.advice.tranche.currentSnapshot
         document.getElementById('cur-date').innerText = this.formatDateTimeForHeader(curSnap.dateTime)
         let curPrices = JSON.parse(curSnap.symbolPricesJson)

         let refSnap = view.advice.tranche.referenceSnapshot
         document.getElementById('ref-date').innerText = this.formatDateTimeForHeader(refSnap.dateTime)
         let refPrices = JSON.parse(refSnap.symbolPricesJson)

         let purSnap = view.advice.tranche.purchaseSnapshot
         document.getElementById('pur-date').innerText = this.formatDateTimeForHeader(purSnap.dateTime)
         let purPrices = JSON.parse(purSnap.symbolPricesJson)

         let sList = document.querySelector('.snapshots .list')
         let symbols = Object.getOwnPropertyNames(curPrices)
         symbols.forEach(s => {
            let item = {
               'sym':s,
               'cur':this.formatPrice(curPrices[s]),
               'ref':this.formatPrice(refPrices[s]),
               'pur':this.formatPrice(purPrices[s])
            }
            sList.appendChild(this.createSnapshotListItem(item))
         })

         let advisingFor = {}
         let aList = document.querySelector('.advice .list')
         view.advice.adviceList.forEach(a => {
            if (a.symbol == view.advice.advisingForSymbol) {
               advisingFor = a
            } else {
               a.restrictions = []
               view.restrictions.forEach(res => {
                  if(res.symbol == a.symbol)
                  {
                     a.restrictions.push(res)
                  }
               })
               aList.appendChild(this.createAdviceListItem(a))
            }
         })

         document.getElementById('owned-symbol').innerText = advisingFor.symbol
         document.getElementById('rank').innerText = advisingFor.rank
         document.getElementById('ref-diff').innerText = this.formatRefDiff(advisingFor.refDiff)
         
         loader.hide()
      })
   }

   //#endregion
}

page = new TranchePage()
