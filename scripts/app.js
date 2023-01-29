const routes = {
   HOME: {
      path: "/",
      file: "./scripts/pages/"
   }
}

class App {
   constructor() {
      this.div = document.getElementById("content")
      this.state = new State("OddAuba:Invest")
      this.funtilityApi = window.location.host ? new FuntilityAPI("OddAuba") : new FuntilityAPI("OddAuba",'http://localhost:5194/')
      this.funtilityUi = new FuntilityUI(this.funtilityApi, true)
      this.route()
   }

   route() {
      if (this.funtilityApi.userIsSignedIn) {
        //   let page = this.state.currentPage === pages.SPLASH ? pages.FOCUS : this.state.currentPage
        //   this.routeToPage(page)
      } else {
        //   this.routeToPage(pages.SPLASH)
      }
   }
}
