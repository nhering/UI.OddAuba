/**
 * Use the State class for persisting data across pages.
 * The state class also has a localstorage interfce for
 * accessing Window.localStorage to persiste state
 * accross sesssions.
 */
class State {
   #name = ""
   constructor(name) {
      this.#name = name
      this.load()
   }

   //#region Application

   #lastLoginEmail = ""
   get lastLoginEmail() { return this.#lastLoginEmail }
   set lastLoginEmail(value)
   { 
      this.#lastLoginEmail = value
      this.save()
   }

   #currentPage //LocalStorage: true
   get currentPage() { return this.#currentPage }
   set currentPage(value)
   {
      this.#currentPage = value
      this.save()
   }

   #currentUserEmail //LocalStorage: true
   get currentUserEmail() { return this.#currentUserEmail }
   set currentUserEmail(value)
   {
      this.#currentUserEmail = value
      this.save()
   }

   #marketState = false //LocalStorage: false
   get marketState()
   {
      if (!this.#marketState)
      {
         this.#marketState = {
            isOpen: null,
            nextChange: null
         }
      }
      return this.#marketState
   }
   set marketState(value)
   {
      let ms = value.result
      let sec
      if (ms.isOpen)
      {
         sec = Date.now() + (ms.secondsTillClose * 1000)
      } else {
         sec = Date.now() + (ms.secondsTillOpen * 1000)
      }
      let next = new Date(sec)
      next.setMilliseconds(0)
      this.#marketState = {
         isOpen: ms.isOpen,
         nextChange: next
      }
   }

   //#endregion

   //#region Pool Page

   #poolListParams //LocalStorage: true
   get poolListParams() { return this.#poolListParams }
   set poolListParams(value)
   {
      this.#poolListParams = value
      this.save()
   }

   #poolListItems = []; //LocalStorage: false
   get poolListItems() { return this.#poolListItems }
   set poolListItems(value)
   {
      if(typeof(value) === 'string') {
         this.#poolListItems = value.split(',')
      } else {
         this.#poolListItems = value
      }
   }

   //#endregion

   //#region Local Storage

   load() {
      let local = localStorage.getItem(this.#name)
      if (local == null)
      {
         this.#lastLoginEmail = ""
         this.#currentPage = "Home"
         this.#currentUserEmail = ""
         this.#poolListParams = { sort:"", search:"" }
      }
      else
      {
         local = JSON.parse(local)
         this.#lastLoginEmail = local.lastLoginEmail ? local.lastLoginEmail : ""
         this.#currentPage = local.currentPage
         this.#currentUserEmail = local.currentUserEmail
         this.#poolListParams = local.poolListParams
      }
      this.save()
   }

   save()
   {
      localStorage.setItem(this.#name,this.toJson())
   }

   toJson()
   {
      return `{
         "lastLoginEmail": "${this.#lastLoginEmail}",
         "currentPage": "${this.currentPage}",
         "currentUserEmail": "${this.currentUserEmail}",
         "poolListParams": ${JSON.stringify(this.poolListParams)}
      }`
   }

   //#endregion
}
