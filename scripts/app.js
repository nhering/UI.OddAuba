class App {
   constructor() { }

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
      let c = document.getElementById('content')
      if (c) c.remove()
      
      state.currentPage = pg
      let src = './scripts/pages/home.js'

      if      (pg === 'home')       { src = './scripts/pages/home.js' }
      else if (pg === 'pool')       { src = './scripts/pages/pool.js' } 
      else if (pg === 'positions')  { src = './scripts/pages/positions.js' } 
      else if (pg === 'settings')   { src = './scripts/pages/settings.js' } 
      else if (pg === 'tranche')    { src = './scripts/pages/tranche.js' }

      await this.loadPageScript(src)
      .then((page) => {
         document.body.appendChild(page.element)
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

class PageBase {
   pageName
   constructor(name) {
      this.pageName = name
    }

    get element()
    {
       let e = document.createElement('div')
       e.setAttribute('id','content')
       e.classList.add('page')
       e.appendChild(this.topBar)
       e.appendChild(this.mainArea)
       return e
    }

   get topBar()
   {
      let e = document.createElement('div')
      e.setAttribute('id','top-bar')
      e.appendChild(menuButton())
      e.appendChild(this.pageLabel)
      return e
   }
   
   get pageLabel()
   {
      let e = document.createElement('div')
      e.classList.add('page-lbl')
      e.innerText = this.pageName;
      return e
   }

   /**
    * Overrideable property for implementations of the PageBase class
    */
   get mainArea() {
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
