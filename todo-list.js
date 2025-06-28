
const addBtn = document.getElementsByClassName("add")[0]
const itemList = document.getElementsByClassName("item-list")[0]

let deleteBtns = null
let submitBtns = null
let todoArray = []
let counter = 0

//localStorage.clear()
let todoMap = JSON.parse(localStorage.getItem("list"))
todoMap = new Map(todoMap)

console.log(todoMap)
console.log(todoMap.size)




if (todoMap.size == null) {
  todoMap = new Map()
  //localStorage.getItem("list", JSON.stringify(Array.from(todoMap.entries())))
} else {
  const rows = todoMap.size / 2
  console.log(rows)
  for (let i = 1; i <= rows; i++) {
    addTemplate()
    //textInput.textContent = todoMap.get(`item${i}`)
    //dateInput.textContent = todoMap.get(`dateItem${i}`) //textInput and date are not defined. may have to make separate function
  }

}

addBtn.addEventListener("click", function() {
  counter += 1
  addTemplate()
  deleteBtns = document.querySelectorAll(".delete")
  deleteBtns.forEach(function(Btn) {
    Btn.addEventListener("click", function() {
      let lastChar = Btn.id[Btn.id.length - 1]
      let itemToRemove = document.getElementById(`item${lastChar}`)
      console.log(lastChar)
      console.log(Btn.id)
      if (Btn.id === `delete${lastChar}`) {
        itemToRemove.remove()

        localStorage.removeItem(`item${lastChar}`)
        localStorage.removeItem(`dateItem${lastChar}`)

        todoMap.delete(`item${lastChar}`)
        todoMap.delete(`dateItem${lastChar}`)

        //decreaseID(lastChar)

        localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))
        todoMap = new Map(JSON.parse(localStorage.getItem("list")))
        
      }
      
      

      

      //decrease id of buttons after delete
      
    })
    
  })
  submitBtns = document.querySelectorAll(".submit")
  submitBtns.forEach(function(Btn) {
    Btn.addEventListener("click", function() {
      let lastChar = Btn.id[Btn.id.length - 1]
      let itemToSave = document.getElementById(`item${lastChar}`)
      todoMap.set(`item${lastChar}`, itemToSave.querySelectorAll(".child")[0].value)
      todoMap.set(`dateItem${lastChar}`, itemToSave.querySelectorAll(".child")[1].value)
      localStorage.setItem("list", JSON.stringify(Array.from(todoMap.entries())))

      todoMap = new Map(JSON.parse(localStorage.getItem("list")))
      console.log("localStorage:", todoMap)

      if (todoMap.get(`dateItem${lastChar}`).length == 0) { 
        console.log("No Date")
      }
      else {
        console.log(todoMap.get(`dateItem${lastChar}`))
      }

      if (todoMap.get(`item${lastChar}`).length == 0) { 
        console.log("No ToDo")
      }
      else {
        console.log(todoMap.get(`item${lastChar}`))
      }
      console.log(todoMap)
      
      
      //console.log((itemToSave.querySelectorAll(".child")[1].value))
      
      
    })
  })

})

function addTemplate() {
  let item = document.createElement("div")
  item.classList.add("item")
  item.id = `item${counter}`

  itemList.appendChild(item)

  let textInput = document.createElement("input")
  textInput.setAttribute("type", "text")
  textInput.placeholder = "Whatcha wanna do?"
  textInput.classList.add("child")
  
  item.appendChild(textInput)

  let dateInput = document.createElement("input")
  dateInput.setAttribute("type", "date")
  dateInput.classList.add("child")

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
   //checker(submitBtn)


   if (todoMap.size != null)

}


function checker(tag) {
  if (tag) {
    console.log("Present")
  } else {
    console.log("Absent")
  }
}


function decreaseID(id) {
  items = document.querySelectorAll(".item")
  items.forEach( function(item) {
    let lastChar = item.id[item.id.length - 1]
    try {
      if (lastChar < id) {
        let replace = lastChar - 1
        item.id = `item${replace}`
        const children = item.children
        let delBtnChange = document.getElementById(`delete${lastChar}`)
        let subBtnChange = document.getElementById(`submit${lastChar}`)
        
        delBtnChange.id = `delete${replace}`
        subBtnChange.id = `submit${replace}`
      } else {
          null
      }
    } catch (e) {
      console.log("disregard")
    }

  })
}
















/*function GetToDO() {
  let form = document.createElement("form")
  document.body.appendChild(form)

  let submitBtn = document.createElement("button")
  submitBtn.classList.add("submit")
  submitBtn.textContent = "Submit"

  let textarea = document.createElement("textarea")
  textarea.classList.add("item")

  let label = document.createElement("label")
  label.textContent = "Adding to your list:"

  form.appendChild(label)
  form.appendChild(textarea)
  form.appendChild(submitBtn)

  submitBtn.addEventListener("click", function() {
    let input = textarea.value
    console.log(typeof(input))
    addToList(input)

  })

}*/