
const addBtn = document.getElementsByClassName("add")[0]
const itemList = document.getElementsByClassName("item-list")[0]

let deleteBtns = null
let submitBtns = null
let todoArray = []
let counter = 0



addBtn.addEventListener("click", function() {
  counter += 1
  addTemplate()
  deleteBtns = document.querySelectorAll(".delete")
  deleteBtns.forEach(function(Btn) {
    Btn.addEventListener("click", function() {
      let lastChar = Btn.id[Btn.id.length - 1]
      let itemToRemove = document.getElementById(`item${lastChar}`)
      itemToRemove.remove()
      counter -= 1
    })
  })
  submitBtns = document.querySelectorAll(".submit")
  submitBtns.forEach(function(Btn) {
    Btn.addEventListener("click", function() {
      let lastChar = Btn.id[Btn.id.length - 1]
      let itemToSave = document.getElementById(`item${lastChar}`)
      console.log(itemToSave.querySelectorAll(".child")[0].value)
      
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


}


function checker(tag) {
  if (tag) {
    console.log("Present")
  } else {
    console.log("Absent")
  }
}


function addToList(content) {
  todoArray.push(content)
  const itemList = document.getElementsByClassName("item-list")[0]
  let newDiv = document.createElement("div")
  newDiv.textContent = content
  itemList.appendChild(newDiv)
  console.log(`Inside addToList: ${content}`)
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