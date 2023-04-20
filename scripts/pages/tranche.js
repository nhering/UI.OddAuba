class TranchePage extends PageBase {
   constructor() {
      super("Tranche")
   }

   get element()
   {
      let n = document.createElement('div')
      n.classList.add('under-construction')
      n.innerText = "Under Construction"
      return n
   }
}

page = new TranchePage()
