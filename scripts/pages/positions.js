class PositionsPage extends PageBase {
   constructor() {
      super("Positions")
   }

   get mainArea()
   {
      let n = document.createElement('div')
      n.classList.add('under-construction')
      n.innerText = "Under Construction"
      return n
   }
}

page = new PositionsPage()
