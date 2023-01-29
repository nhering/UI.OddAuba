/**
 * Use the State class for storing data accross pages.
 * The state class also has a localstorage interfce for
 * accessing Window.localStorage to persiste state
 * accross sesssions.
 */
class State {
   #name = "Domain:App"
   constructor(name) {
      this.#name = name

      this.load()
   }

   //#region example property

   #property = "default value"

   get property()
   {
      return this.#property
   }

   set property(value)
   {
      try {
         // this is where you can validate the incoming value
         this.#property = value
      } catch (error) {
         console.error(error)
         this.#property = "default value"
      }
      this.save()
   }

   //#endregion

   //#region Local Storage

   load() {
      let local = localStorage.getItem(this.name)
      if (local == null)
      {
         this.#property = "default value"
      }
      else
      {
         local = JSON.parse(local)
         this.#property = local.property
      }
      this.save()
   }

   save()
   {
      localStorage.setItem(this.name,this.toJson())
   }

   toJson()
   {
      return `{
         "property": "${this.property}"
      }`
   }

   //#endregion
}
