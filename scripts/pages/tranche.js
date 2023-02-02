class TranchePage {
   constructor() {
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
      e.appendChild(pageLabel('Tranche'))
      return e
   }

   get mainArea()
   {
      let n = document.createElement('div')
      n.classList.add('under-construction')
      n.innerText = "Under Construction"
      return n
   }
}