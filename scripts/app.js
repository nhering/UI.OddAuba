class App {
   constructor() {
      this.route()
   }

   route() {
      // const params = this.getSearchParams()
      // if(params.pg != "") {
      //    this.loadPage(params.pg)
      // }

      if (funtilityApi.userIsSignedIn) {
         const params = this.getSearchParams()
         if(params.pg != "") {
            this.loadPage(params.pg)
         } else {
            window.location = `${window.location.pathname}?pg=$settings`
         }
      } else {
         this.loadPage("home")
      }
   }

   getSearchParams(){
      const search = window.location.search.substring(1)
      let result = {
            pg: ""
         }
      if (search != ""){
         search.split('&').forEach((n) => {
            let arg = n.split('=')
            if (arg[0] == "pg") result.pg = arg[1]
         })
      }
      return result
   }

   loadPage(pg)
   {
      let fn
      document.getElementById('content').remove()
      switch(pg) {
         case "pool":
            this.swapContentScript('./scripts/pages/pool.js')
            fn = () => {
               let pg = new PoolPage()
               document.querySelector('body').appendChild(pg.element)
               pg.populateList()
            }
         break
         case "positions":
            this.swapContentScript('./scripts/pages/positions.js')
            fn = () => {
               let pg = new PositionsPage()
               document.querySelector('body').appendChild(pg.element)
            }
         break
         case "settings":
            this.swapContentScript('./scripts/pages/settings.js')
            fn = () => {
               let pg = new SettingsPage()
               document.querySelector('body').appendChild(pg.element) 
            }
         break
         case "tranche":
            this.swapContentScript('./scripts/pages/tranche.js')
            fn = () => {
               let pg = new TranchePage()
               document.querySelector('body').appendChild(pg.element)
            }
         break
         default:
            this.swapContentScript('./scripts/pages/home.js')         
            fn = () => {
               document.querySelector('body').appendChild(new HomePage().element)
               new BackgroundAnimation()
            }
         break
      }
      try {
         setTimeout(fn,100)
      } catch {
         setTimeout(fn,200)
      }
   }

   swapContentScript(src)
   {
      let old = document.getElementById('content-script')
      if (old) old.remove()

      let ele = document.createElement('script')
      ele.setAttribute('type','text/javascript')
      ele.setAttribute('src',src)
      ele.setAttribute('id','content-script')
      document.querySelector('head').appendChild(ele)
   }
}

pageLabel = (lbl) => {
   let e = document.createElement('div')
   e.classList.add('page-lbl')
   e.innerText = lbl
   return e
}