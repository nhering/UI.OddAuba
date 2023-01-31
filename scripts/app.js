class App {
   constructor() {
      // this.content = document.getElementById("content")
      this.state = new State("OddAuba:UI")
      this.funtilityApi = window.location.host ? new FuntilityAPI("OddAuba") : new FuntilityAPI("OddAuba",'http://localhost:5194/')
      this.funtilityUi = new FuntilityUI(this.funtilityApi, true)
      this.route()
   }

   route() {
      if (this.funtilityApi.userIsSignedIn) {
         const params = this.getSearchParams()
         if(params.pg != "") {
            this.loadPage(params.pg)
         }
      } else {
         //OddAuba is a private application, show nothing if the user is not signed in.
         this.loadPage("home")
      }
   }

   getSearchParams(){
      const search = window.location.search.substring(1)
      if (search != ""){
         let result = {
         pg: ""
         }
         search.split('&').forEach((n) => {
            let arg = n.split('=')
            if (arg[0] == "pg") result.pg = arg[1]
         })
         return args
      }
   }

   loadPage(pg)
   {
      let fn
      if (pg === "settings")
      {
         this.swapContentScript('./scripts/pages/settings.js')
         fn = () => {
            this.content.appendChild(new SettingsPage().element) 
         }
      } else {
         this.swapContentScript('./scripts/pages/home.js')         
         fn = () => {
            document.getElementById('content').remove()
            document.querySelector('body').appendChild(new HomePage().element)
            // new BackgroundAnimation()
         }
      }
      setTimeout(fn,300)
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
