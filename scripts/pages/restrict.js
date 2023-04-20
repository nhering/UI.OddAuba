class RestrictionPage extends PageBase {
   constructor() {
      super("Restrict")
   }

   get element()
   {
      let n = document.createElement('div')
      n.classList.add('under-construction')
      n.innerText = "Under Construction"
      // e.classList.add('page-restriction')
      // e.appendChild(this.controls)
      return n
   }

   //#region controls

   get controls()
   {
      let e = document.createElement('div')
      e.classList.add('controls')
      e.appendChild(this.newRestriction)
      return e
   }

   get newRestriction()
   {
      let e = document.createElement('div')
      e.appendChild(this.inputLabel('add-restriction','Add Restriction'))
      e.classList.add('control')
      return e
   }

   inputLabel(name,txt)
   {
      let l = document.createElement('label')
      l.setAttribute('for',name)
      l.innerText = txt
      return l
   }

   select(id,options)
   {
      let s = document.createElement('select')
      s.setAttribute('id', id)
      s.addEventListener('change', () => {
         let x = s.childNodes[s.selectedIndex]
      //    this.#listParams[id] = x.value
      //    state.poolListParams = this.#listParams
      //    s.selectedIndex = 0;
      //    this.populateList()
      })
      s.appendChild(this.option(['','-- Select --']))
      // options.forEach(opt => {
      //    let o = this.option(opt)
      //    s.appendChild(o)
      // })
      return s
   }

   option(opt)
   {
      let o = document.createElement('option')
      o.setAttribute('value',opt[0])
      o.innerHTML = opt[1]
      return o
   }

   //#endregion

   async load() {
      loader.show()
      Promise.all([this.GET_restrictions()])
      .then(() =>{
         loader.hide()
      })
   }

   async GET_restrictions()
   {
      await funtilityApi.GET("oddauba/restrict")
      .then((resp) => {
         state.restrictedSymbols = resp.result
      })
   }
}

page = new RestrictionPage()
