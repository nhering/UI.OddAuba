/**
 * Creates a div containing all the menu items
 */
class Menu {
   constructor() {}
   #items = [
      "Restrict",
      "Tranche",
      "Pool",
      "Settings"]

   get element()
   {
      let div = document.createElement('div')
      div.setAttribute('id', 'menu')
      this.#items.forEach(i => {
         div.appendChild(this.menuItem(i))
      })
      div.appendChild(this.signOut)
      return div
   }

   menuItem(item)
   {
      let div = document.createElement('div')
      div.classList.add('menu-item')
      if(item.toLowerCase() == state.currentPage.toLowerCase()) {
         div.classList.add("selected")
         div.addEventListener('click', () => {
            let m = document.getElementById('menu')
            if(m) { m.remove() }
         })
      } else {
         div.addEventListener('click', () => {
            state.currentPage = item
            window.location = `${window.location.pathname}?pg=${item.toLowerCase()}`
         })
      }
      div.innerText = item
      return div
   }

   get signOut()
   {
      let e = document.createElement('div')
      e.classList.add('sign-out')
      e.innerText = "Sign Out"
      e.onclick = () => { 
         funtilityApi.signOut()
         window.location = `${window.location.pathname}?pg=home}`
      }
      return e
   }
}

menuButton = () => {
   let e = document.createElement('div')
   e.setAttribute('id','menu-btn')
   e.addEventListener('click', () => {
      let m = document.getElementById('menu')
      if(m) {
         m.remove()
      } else {
         // let hdr = document.getElementById('header').offsetHeight
         let btn = document.getElementById('top-bar').offsetHeight
         let m = new Menu().element
         m.style.top = btn
         let bod = document.querySelector('body')
         m.style.height = bod.offsetHeight - btn
         bod.appendChild(m)
      }
   })
   let s = document.createElement('span')
   s.innerText = "|||"
   e.appendChild(s)
   return e
}

let warnBeforeNavigating = false
