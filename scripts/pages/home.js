class HomePage extends PageBase{
   #signInPhase = 1
   constructor() {
      super("OddAuba")
    }

    refresh()
    {
       let parentEle = document.getElementById('content')
       parentEle.innerHTML = null
       parentEle.appendChild(this.element)
    }

   get element()
   {
      let e = document.createElement('div')
      e.classList.add('page-home')
      e.appendChild(this.signInContainer)
      return e
   }

   get signInContainer()
   {
      let container = document.createElement('div')
      container.classList.add('sign-in')
      container.id = 'sign-in-process'
      let fs = this.fieldSet
      if (this.#signInPhase == 1) {
         this.addEnterEmailComponents(fs)
      } else {
         this.addEnterCodeComponents(fs)
      }
      fs.appendChild(this.validation)
      container.appendChild(fs)
      return container
   }   

   get fieldSet()
   {
      let fieldset = document.createElement('fieldset')

      let legend = document.createElement('legend')
      legend.innerText = "Sign in to OddAuba"
      fieldset.appendChild(legend)

      return fieldset
   }

   get validation()
   {
      let ele = document.createElement('div')
      ele.id = 'validation'
      return ele
   }

   //#region Enter Email

   addEnterEmailComponents(container)
   {
      container.appendChild(this.emailMessage)
      container.appendChild(this.emailInput)
      container.appendChild(this.emailButton)
   }

   get emailMessage()
   {
      let ele = document.createElement('div')
      ele.classList.add('msg')
      ele.innerText = "Enter the email to send the code to."
      return ele
   }

   get emailInput()
   {
      let input = document.createElement('input')
      input.id = "email"
      input.type = 'text'
      input.placeholder = "Email"
      input.setAttribute('name', 'emailInput')
      if (state.lastLoginEmail !== "undefined")
      {
         input.value = state.lastLoginEmail
      }
      input.onkeyup = (event) => { 
         if (event.key == 'Enter') this.requestSignInCode()
      }
      return input
   }

   get emailButton()
   {
      let label = document.createElement('label')
      label.setAttribute('for', 'emailInput')
      label.innerText = "Send"
      label.onclick = () => {
         this.requestSignInCode()
      }
      return label
   }

   requestSignInCode()
   {
       let form = this.emailForm
       if (form.isValid)
       {
           loader.show(500)
           funtilityApi.GET_LoginCode(form.email)
           .then((res) => {
               if(res.errors.length > 0) {
                   res.errors.forEach((err) => {
                       this.showMessage('validation', err, 10000)
                   })
                   loader.error('Error Sending Code')
               } else {
                  state.lastLoginEmail = form.email
                  this.#signInPhase = 2
                  loader.hide()
                  this.refresh()
               }
           })
       }
   }

  get emailForm()
  {
     let email = this.getInputValue('email')

     let isValid = () => {
        let result = true
        if (email == "") {
            result = false
            this.showMessage('validation', 'Email Is Required')
        } else if (!this.isValidEmail(email)) {
           result = false
           this.showMessage('validation', 'Invalid Email')
        }
        return result
     }

     return {
        'email': email,
        'isValid': isValid()
     }
  }

   //#endregion

   //#region Enter Code

   addEnterCodeComponents(container)
   {
      container.appendChild(this.codeMessage)
      container.appendChild(this.codeInput)
      container.appendChild(this.codeButton)
   }

   get codeMessage()
   {
      let ele = document.createElement('div')
      ele.classList.add('msg')
      ele.innerText = "Enter the code we emailed to you."
      return ele
   }

   get codeInput()
   {
      let input = document.createElement('input')
      input.id = "code"
      input.type = 'text'
      input.placeholder = "Code"
      input.setAttribute('name', 'codeInput')
      input.onkeyup = (event) => { 
         if (event.key == 'Enter') this.submitSignInCode()
      }
      return input
   }

   get codeButton()
   {
      let label = document.createElement('label')
      label.setAttribute('for', 'codeInput')
      label.innerText = "Submit"
      label.onclick = () => {
         this.submitSignInCode()
      }
      return label
   }

   submitSignInCode()
   {
       let form = this.codeForm
       if (form.isValid)
       {
           loader.show(500)
           funtilityApi.GET_Authentication(form.code)
           .then((res) => {
               if(res.errors.length > 0) {
                   res.errors.forEach((err) => {
                       this.showMessage('validation', err, 10000)
                   })
                   loader.error('Error Sending Code')
               } else {
                   loader.hide()
                   window.location = `${window.location.pathname}?pg=${state.currentPage}`
               }
           })
       }
   }

  get codeForm()
  {
     let code = this.getInputValue('code')

     let isValid = () => {
        let result = true
        if (code == "") {
            result = false
            this.showMessage('validation', 'Code Is Required')
        } else if (!this.isValidCode(code)) {
           result = false
           this.showMessage('validation', 'Code Email')
        }
        return result
     }

     return {
        'code': code,
        'isValid': isValid()
     }
  }

   //#endregion

   //TODO Move to utilities
   getInputValue(id)
   {
       let inputElement = document.getElementById(id)
       if (inputElement == 'undefined') return null
       return inputElement.value
   }

   isValidEmail(email)
   {
       return String(email)
           .toLowerCase()
           .match(
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
             ) !== null
   }

   isValidCode(code)
   {
       let result = true
       if (code.length !== 4) {
           result = false
       } else {
           for(let i=0; i < code.length; i++)
           {
               let parsed = parseInt(code[i])
               if (isNaN(parsed)) result = false
           }
       }
       return result
   }

   //TODO Move to utilities
   /**
    * Creates a div element and appends it as a child of the element with the targetId.
    * @param {string} targetId The id of the element where the message will be appended as a child element.
    * @param {string} message The message to display.
    * @param {number} timeout The duration in milliseconds to display the message.
    */
    showMessage(targetId, message, timeout = 2000)
    {
        let parent = document.getElementById(targetId)
        parent.innerHTML = null
        let ele = document.createElement('div')
        ele.innerText = message
        setTimeout(() => { ele.remove() }, timeout)
        parent.appendChild(ele)
    }

   load()
   {
      
   }
}

page = new HomePage()
