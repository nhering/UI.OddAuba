class SettingsPage extends PageBase {
   constructor() {
      super("Settings")
   }

   get element()
   {
      let n = document.createElement('div')
      n.classList.add('under-construction')
      n.innerText = "Under Construction"
      return n
   }
}

page = new SettingsPage()
