/**
 * Creates a div containing all the menu items
 * and wires them up to the callback function
 * passed into the constructor.
 */
class Menu {
   #items = []
   #selectedItem = ""
   constructor(selectedItem)
   {
      this.#items = ["Settings"]
      this.#selectedItem = selectedItem
   }

   get element()
   {
      let div = document.createElement('div')
      div.classList.add('menu')
      this.#items.forEach(i => {
         div.appendChild(this.menuItem(i))
      })
      return div
   }

   menuItem(item)
   {
      let div = document.createElement('div')
      div.classList.add('menu-item')
      if(this.#selectedItem == item.display) {
         div.classList.add("selected")
      } else {
         div.addEventListener('click', () => { 
            window.location = `${window.location.pathname}?pg=${item.display}`
         })
      }
      div.innerText(item.display)
      return div
   }
}
