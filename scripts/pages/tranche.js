class TranchePage extends PageBase {
   constructor() {
      super("Tranche")
   }

   get mainArea()
   {
      let n = document.createElement('div')
      n.classList.add('under-construction')
      n.innerText = "Under Construction"
      return n
   }
}

page = new TranchePage()
