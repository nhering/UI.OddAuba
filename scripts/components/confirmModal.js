/**
 * Creates a modal that fills the page and requires the user to select
 * one of two options. One response returns 'true' and the other returns 'false'
 * @param {string} msg The text to display in the body of the modal.
 * @param {string} trueTxt The text to display in the button that will return true.
 * Defaults to "Accept"
 * @param {string} falseTxt The text to display in the button that will return false.
 * Defaults to "Cancel"
 */
class ConfirmModal {
   constructor(msg, trueTxt = 'Accept', falseTxt = 'Cancel')
   {
      this.msg = msg
      this.trueTxt = trueTxt
      this.falseTxt = falseTxt
   }

   get background()
   {
      let e = document.createElement('div')
      e.id = 'modal'
      return e
   }

   get container()
   {
      let e = document.createElement('div')
      return e
   }

   get message()
   {
      let e = document.createElement('div')
      return e
   }

   get trueButton()
   {
      let e = document.createElement('div')
      return e
   }

   get falseButton()
   {
      let e = document.createElement('div')
      return e
   }
}
