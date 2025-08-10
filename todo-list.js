
const addBtn = document.getElementsByClassName("add")[0]
const itemList = document.getElementsByClassName("item-list")[0]

let deleteBtns = null
let submitBtns = null
let lastTodo = null

let counter = 0
let pauseCounter = 0


let todoMap = JSON.parse(localStorage.getItem("list"))
todoMap = new Map(todoMap)



let rows = null


if (todoMap.size == 0) {
  todoMap = new Map()
  rows = 0
  //localStorage.getItem("list", JSON.stringify(Array.from(todoMap.entries())))
} else {
  rows = todoMap.size / 2
  console.log(rows)
  pauseCounter +=1
  for (let i = 1; i <= rows; i++) {
    addTemplate(i)
  }

}

if (counter == null) {
  counter = 0
} else {
  console.log(`rows after reload: ${rows}`)
  counter = rows
}

let reload = null
if (performance.getEntriesByType("navigation")[0].type === "reload") {
    reload = true
} else {
    reload = false
}


deleteFunction()



submitBtns = document.querySelectorAll(".submit")
submitBtns.forEach(function(Btn) {
  Btn.addEventListener("click", function() {
    pauseCounter += 1
    let lastChar = Btn.id[Btn.id.length - 1]
    let itemToSave = document.getElementById(`item${lastChar}`)
    console.log(itemToSave)
    todoMap.set(`item${lastChar}`, itemToSave.querySelectorAll(".child")[0].value)
    todoMap.set(`dateItem${lastChar}`, itemToSave.querySelectorAll(".child")[1].value)
    localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))


    //localStorage.setItem(`textInput${lastChar}`, `textInput${lastChar}`)
    //localStorage.setItem(`dateInput${lastChar}`, `dateInput${lastChar}`)

    todoMap = new Map(JSON.parse(localStorage.getItem("list")))
    console.log("localStorage:", todoMap)


    
    
  })
})













addBtn.addEventListener("click", function() {
  
  //localStorage.setItem("counter", counter)


  if (document.getElementsByClassName("item").length == 0) {
    pauseCounter += 1
    counter += 1
    addTemplate()
  }
  if (document.getElementsByClassName("item").length == 9) {
    alert("Finish up some tasks before you add more.")
  }
  else if (pauseCounter > 0 && todoMap.size > 0) {
    pauseCounter = 0
    counter += 1
    addTemplate()
  }
  else if (document.getElementsByClassName("item").length * 2 == todoMap.size   && reload == true) {
    pauseCounter = 0
    counter +=1
    reload = false
    addTemplate()
  }


  



  submitBtns = document.querySelectorAll(".submit")
  submitBtns.forEach(function(Btn) {
    Btn.addEventListener("click", function() {
      pauseCounter += 1
      let lastChar = Btn.id[Btn.id.length - 1]
      let itemToSave = document.getElementById(`item${lastChar}`)
      console.log(itemToSave)
      todoMap.set(`item${lastChar}`, itemToSave.querySelectorAll(".child")[0].value)
      todoMap.set(`dateItem${lastChar}`, itemToSave.querySelectorAll(".child")[1].value)
      localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))



      //localStorage.setItem(`textInput${lastChar}`, `textInput${lastChar}`)
      //localStorage.setItem(`dateInput${lastChar}`, `dateInput${lastChar}`)
      

      todoMap = new Map(JSON.parse(localStorage.getItem("list")))
      console.log("localStorage:", todoMap)
      rows = todoMap.size / 2
      
      
      //console.log((itemToSave.querySelectorAll(".child")[1].value))
      
      
    })
  })

})

const clearBtn = document.getElementsByClassName("clear")[0]
clearBtn.addEventListener("click", deleteAll)


function addTemplate(i) {
  let item = document.createElement("div")
  item.classList.add("item")
  item.id = `item${counter}`

  itemList.appendChild(item)

  let textInput = document.createElement("input")
  textInput.setAttribute("type", "text")
  

  textInput.placeholder = "Whatcha wanna do?"
  textInput.classList.add("child")
  textInput.id = `textInput${counter}`
  
  item.appendChild(textInput)

  let dateInput = document.createElement("input")
  dateInput.setAttribute("type", "date")
  dateInput.classList.add("child")
  dateInput.id = `dateInput${counter}`

  item.appendChild(dateInput)

  let submitBtn = document.createElement("button")
  submitBtn.classList.add("submit", "child")
  submitBtn.id = `submit${counter}`
  submitBtn.textContent = "Submit"

  item.appendChild(submitBtn)

  let deleteBtn = document.createElement("button")
  deleteBtn.classList.add("delete", "child")
  deleteBtn.id = `delete${counter}`
  deleteBtn.textContent = "Delete"


  item.appendChild(deleteBtn)



  IdChange(i, textInput, dateInput)

   }










function deleteAll() {
  counter = 0
  rows = 0
  items = document.querySelectorAll(".item")
  items.forEach(function(item) {
    item.remove()
  })

  todoMap.clear()
  localStorage.clear()
  pauseCounter = 0
}




function IdChange(i, textInput, dateInput) {   
  if (todoMap.size != null && i !== undefined) {   

    textInput.parentElement.id = `item${i}`
    textInput.id = `textInput${i}`
    dateInput.id = `dateInput${i}`
    
    document.getElementById(`item${i}`).children[2].id = `submit${i}`
    document.getElementById(`item${i}`).children[3].id = `delete${i}`

    textInput.setAttribute("value", todoMap.get(`item${i}`))  //give elements back their id
    dateInput.setAttribute("value", todoMap.get(`dateItem${i}`))
  }
}



function deleteFunction() {
  rows = todoMap.size / 2
  let passVal = 0

  let lastItemDate = null
  let lastItemText = null
  let lastItemDate2 = null
  let lastItemText2 = null

  let itemToRemove = null


  deleteBtns = document.querySelectorAll(".delete")
  let Btn = null
  itemList.addEventListener("click", function(event) {
    if (event.target.matches(".delete")) {
      Btn = event.target
      pauseCounter += 1
      let lastChar = Btn.id[Btn.id.length - 1]

      if (document.getElementsByClassName("item").length > 0 && todoMap.size == 0) {
        document.getElementById(`item${lastChar}`).remove()
        counter -= 1
      }

      else if (Btn.id === `delete${lastChar}`) {
        console.log(Btn.id)
        lastChar = Btn.id[Btn.id.length - 1]
        itemToRemove = document.getElementById(`item${lastChar}`)
        passVal += 1

        lastItemText = todoMap.get(`item${rows}`)
        lastItemDate = todoMap.get(`dateItem${rows}`)

        lastItemText2 = lastItemText
        lastItemDate2 = lastItemDate

        for (let i = rows; i-1 >= 1; i--) {
          if (i < Number(lastChar)) {
            continue
          } if (i > Number(lastChar)) { 
            lastItemText2 = todoMap.get(`item${i-1}`)
            lastItemDate2 = todoMap.get(`dateItem${i-1}`)
            console.log(lastItemText)
            console.log(lastItemText2)
            todoMap.set(`item${i-1}`, lastItemText)
            todoMap.set(`dateItem${i-1}`, lastItemDate)

            
            document.getElementById(`item${i-1}`).children[0].value = lastItemText
            document.getElementById(`item${i-1}`).children[1].value = lastItemDate
            //document.getElementById(`item${i-1}`).children[0].setAttribute("value", lastItemText)
            //document.getElementById(`item${i-1}`).children[1].setAttribute("value", lastItemDate)

            lastItemText = lastItemText2
            lastItemDate = lastItemDate2


          }
        

        }

          rows = todoMap.size / 2
          todoMap.delete(`item${rows}`)
          todoMap.delete(`dateItem${rows}`)

          counter -= 1
          document.getElementById(`item${rows}`).remove()

                

          localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))
          todoMap = new Map(JSON.parse(localStorage.getItem("list")))
        }
        

      /*if (todoMap.has(`item${rows}`)) {
        lastItemText = todoMap.get(`item${rows}`)
        lastItemDate = todoMap.get(`dateItem${rows}`)
        console.log(lastItemText)
        console.log(lastItemDate)
        console.log(Btn.id)
        if (Btn.id === `delete${lastChar}`) {
          itemToRemove.children[0].setAttribute("value", lastItemText)
          itemToRemove.children[1].setAttribute("value", lastItemDate)
          
          lastItem.remove()
          localStorage.removeItem(`item${rows}`)
          localStorage.removeItem(`dateItem${rows}`)

          todoMap.delete(`item${rows}`)
          todoMap.delete(`dateItem${rows}`)

          todoMap.set(`item${lastChar}`, lastItemText)
          todoMap.set(`dateItem${lastChar}`, lastItemDate)

          

          localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))
          todoMap = new Map(JSON.parse(localStorage.getItem("list")))
          
        }  

      }
        else {
          if (Btn.id === `delete${lastChar}`) {
            itemToRemove.remove()

            localStorage.removeItem(`item${lastChar}`)
            localStorage.removeItem(`dateItem${lastChar}`)

            todoMap.delete(`item${lastChar}`)
            todoMap.delete(`dateItem${lastChar}`)

            

            localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))
            todoMap = new Map(JSON.parse(localStorage.getItem("list")))
          }

        
        }*/
      
    }
  })
}





