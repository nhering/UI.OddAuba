class App {
   constructor() {
      this.topBar
      this.content = document.getElementById("content")
    }

   async route() {
      let allowEntry = funtilityApi.userIsSignedIn
      // allowEntry = true //for develop purposes, comment for production
      if (allowEntry) {
         const params = this.queryParams
         if (params.pg && params.pg != 'home') {
            await this.loadPage(params.pg)
         } else {
            window.location = `${window.location.pathname}?pg=settings`
         }
      } else {
         // this.topBar = new TopBar("OddAuba")
         await this.loadPage('home')
      }
   }

   get queryParams()
   {
      let result = { }
      const search = window.location.search.substring(1)
      if (search != ""){
         search.split('&').forEach((n) => {
            let arg = n.split('=')
            result[arg[0].toLocaleLowerCase()] = arg[1].toLocaleLowerCase()
         })
      }
      return result
   }

   async loadPage(pg)
   {
      this.content.innerHTML = null
      
      state.currentPage = pg
      let src = './scripts/pages/home.js'

      if      (pg === 'home')       { src = './scripts/pages/home.js' }
      else if (pg === 'advisor')    { src = './scripts/pages/advisor.js?v=0' } 
      else if (pg === 'pool')       { src = './scripts/pages/pool.js' } 
      else if (pg === 'restrict')   { src = './scripts/pages/restrict.js' } 
      else if (pg === 'settings')   { src = './scripts/pages/settings.js' } 
      else if (pg === 'tranche')    { src = './scripts/pages/tranche.js' }
      else                          { src = './scripts/pages/home.js' }

      await this.loadPageScript(src)
      .then(async (page) => {
         this.topBar = new TopBar(page.pageName)
         this.content.appendChild(page.element)
         page.load()
      })
      .catch((error) => {
         alert(error)
      })
   }

   async loadPageScript(src)
   {
      return new Promise((resolve, reject) => {
         try {
            let ele = document.createElement('script')
            ele.setAttribute('async', true)
            ele.setAttribute('type','text/javascript')
            ele.setAttribute('src',src)
            ele.setAttribute('id','page-file')
            ele.addEventListener('load',() => {
               resolve(page)
            })
            document.head.appendChild(ele)
         } catch (error) {
            reject(error)
         }
      })
   }
}

class TopBar {
   pageName = ""
   constructor(name) {
      this.pageName = name
      this.init()
   }

   init()
   {
      let topBar = document.getElementById('top-bar')
      if(funtilityApi.userIsSignedIn) topBar.appendChild(menuButton())
      topBar.appendChild(this.pageLabel)
      if (funtilityApi.userIsSignedIn)
      {
         topBar.appendChild(this.marketStatus)
         topBar.appendChild(this.marketIndicator)
      } else {
         topBar.appendChild(this.emptyItem)
      }
      
     setTimeout(async () => {
        let marketState = new MarketState()
        let marketIndicator = new MarketIndicator()
        await marketState.load()
        await marketIndicator.load()
     },0)
   }
   
   get pageLabel()
   {
      let e = document.createElement('div')
      e.id = 'page-lbl'
      e.innerText = this.pageName;
      return e
   }

   get marketStatus()
   {
      let e = document.createElement('div')
      e.id = 'market-status'
      e.classList.add('item')
      return e
   }

   get marketIndicator()
   {
      let e = document.createElement('div')
      e.id = 'market-indicator'
      e.classList.add('item')
      return e
   }

   get emptyItem()
   {
      let e = document.createElement('div')
      e.classList.add('item')
      return e
   }
}

class PageBase {
   pageName = ""
   constructor(name) {
      this.pageName = name
    }

   /**
    * Overrideable property for implementations of the PageBase class
    */
    get element()
    {
      let e = document.createElement('div')
      return e
    }

   /**
    * Overrideable method for implementations of the Page class.
    * This is called when the site is loaded and a 'pg' query parameter
    * is found. This should be overriden by the inheriting PageBase
    * class if it needs to perform any async loading.
    */
   async load() { }
}
