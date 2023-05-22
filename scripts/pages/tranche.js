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

   // Tranche Selector

   // Snapshot Section

   // Advice Section
}

page = new TranchePage()
