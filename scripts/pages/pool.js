class PoolPage extends PageBase {
   constructor() {
      super("Pool")
   }

   get mainArea()
   {
      let e = document.createElement('div')
      e.classList.add('page-pool')
      e.appendChild(this.controls)
      e.appendChild(this.symbolList)
      return e
   }

   //#region controls

   get controls()
   {
      let e = document.createElement('div')
      e.classList.add('controls')
      e.appendChild(this.sort)
      e.appendChild(this.search)
      e.appendChild(this.save)
      return e
   }

   get sort()
   {
      let e = document.createElement('div')
      e.classList.add('control')
      e.appendChild(this.inputLabel('sort','Sort'))
      e.appendChild(this.select(
         'sort',
         [['mine-first','Mine First'],['alphabetical','Alphabetical']]
      ))
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
         this.#listParams[id] = x.value
         state.poolListParams = this.#listParams
         s.selectedIndex = 0;
         this.populateList()
      })
      s.appendChild(this.option(['','-- Select --']))
      options.forEach(opt => {
         let o = this.option(opt)
         s.appendChild(o)
      })
      return s
   }

   option(txt)
   {
      let o = document.createElement('option')
      o.setAttribute('value',txt[0])
      o.innerHTML = txt[1]
      return o
   }

   get search()
   {
      let e = document.createElement('div')
      e.classList.add('control')
      e.appendChild(this.inputLabel('search','Search'))
      e.appendChild(this.textInput())
      return e
   }

   textInput()
   {
      let i = document.createElement('input')
      i.setAttribute('type','text')
      i.addEventListener('input',() => {
         this.#listParams.search = i.value.toLowerCase()
         state.poolListParams = this.#listParams
         this.populateList()
      })
      return i
   }

   get save()
   {
      let e = document.createElement('div')
      e.classList.add('control')
      e.appendChild(this.button())
      return e
   }

   button()
   {
      let e = document.createElement('div')
      e.innerText = 'Save'
      e.id = 'save-button'
      e.classList.add('button')
      e.classList.add('disabled')
      e.addEventListener('click',async () => { await this.saveChanges() })
      return e
   }

   async saveChanges()
   {
      let btn = document.getElementById('save-button')
      if (btn) btn.classList.add('disabled')
      await this.POST_pool()
   }

   //#endregion

   //#region symbol list

   get symbolList()
   {
      let h = document.querySelector('body').offsetHeight
      h -= document.getElementById('header').offsetHeight
      h -= 120

      let e = document.createElement('div')
      e.style.height = h
      e.classList.add('list')
      e.setAttribute('id','pool-symbol-list')
      return e
   }

   populateList()
   {
      let list = document.getElementById('pool-symbol-list')
      list.innerHTML = null
      this.sortedList()
         .forEach(i => {
            list.appendChild(i)
         })
   }

   #listParams = { sort: "", search: "" }
   sortedList()
   {
      let mine = []
      let alpha = []
      allSymbols.forEach(i => {
         if (this.found(i))
         {
            let chkd = state.poolListItems.findIndex(e => e === i.symbol ) > -1
            if (this.#listParams.sort === "mine-first")
            {
               if(chkd){
                  mine.push(this.symbolElement(i,chkd))
               } else {
                  alpha.push(this.symbolElement(i,chkd))
               }
            } else {
               alpha.push(this.symbolElement(i,chkd))
            }
         }
      })
      return mine.concat(alpha)
   }

   found(symbol)
   {
      if(this.#listParams.search != "") {
         let c = symbol.company.toLowerCase().indexOf(this.#listParams.search) > -1
         let s = symbol.symbol.toLowerCase().indexOf(this.#listParams.search) > -1
         return c || s
      } 
      return true
   }

   symbolElement(i,mine)
   {
      let chk = document.createElement('div')
      chk.classList.add('chk-box')
      if (mine) chk.classList.add('checked')
      
      let sym = document.createElement('div')
      sym.classList.add('symbol')
      sym.innerText = i.symbol

      let com = document.createElement('div')
      com.classList.add('company')
      com.innerText= i.company

      let line = document.createElement('div')
      line.classList.add('list-item')
      line.addEventListener('click',() => {
         chk.classList.toggle('checked')
         this.toggleSelectedSymbol(i.symbol)
         let btn = document.getElementById('save-button')
         if (btn) btn.classList.remove('disabled')
      })
      
      line.appendChild(chk)
      line.appendChild(sym)
      line.appendChild(com)
      return line
   }

   toggleSelectedSymbol(symbol)
   {
      let list = state.poolListItems
      let finder  = (e) => e == symbol
      let index = list.findIndex(finder)
      if (index > -1) {
         list.splice(index, 1)
      } else {
         list.push(symbol)
         list.sort()
      }
      state.poolListItems = list
   }

   async load() {
      loader.show()
      Promise.all([this.loadSymbolsFile(),this.GET_pool()])
      .then(()=>{
         this.populateList()
         loader.hide()
      })
   }

   async loadSymbolsFile()
   {
      return new Promise((resolve, reject) => {
         try {
            if (!allSymbols)
            {
               let ele = document.createElement('script')
               ele.setAttribute('async', true)
               ele.setAttribute('type','text/javascript')
               ele.setAttribute('src','./scripts/other/symbols.js')
               ele.setAttribute('id','symbols-file')
               ele.addEventListener('load', (event) => {
                  resolve()
               })
               ele.addEventListener('error', (event) => {
                  allSymbols = [{"symbol":"","company":"Error loading symbols.js file."}]
                  reject()
               })
               document.head.appendChild(ele)
            } else {
               resolve()
            }
         } catch (error) {
            reject(error)
         }
      })
   }

   async GET_pool()
   {
      await funtilityApi.GET("oddauba/pool")
      .then((resp) => {
         state.poolListItems = resp.result
      })
   }

   async POST_pool()
   {
      loader.show(1000)
      await funtilityApi.POST("oddauba/pool",state.poolListItems)
      .then(()=> {
         this.populateList()
         loader.success('Saved')
      })
      .catch((err)=>{
         console.log(err)
         loader.error()
      })
   }

   //#endregion
}

page = new PoolPage()
let allSymbols = false
