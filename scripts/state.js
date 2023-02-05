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

   #currentPage
   get currentPage() { return this.#currentPage }
   set currentPage(value)
   {
      this.#currentPage = value
      this.save()
   }

   //#region Pool Page 

   #poolListParams
   get poolListParams() { return this.#poolListParams }
   set poolListParams(value)
   {
      this.#poolListParams = value
      this.save()
   }

   #poolListItems = [];
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
         this.#currentPage = "Home"
         this.#poolListParams = { sort:"", search:"" }
      }
      else
      {
         local = JSON.parse(local)
         this.#currentPage = local.currentPage
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
         "currentPage": "${this.currentPage}",
         "poolListParams": ${JSON.stringify(this.poolListParams)}
      }`
   }

   //#endregion
}
