const addBtn = document.getElementById("add")
let counter = 0
let array = []

addBtn.addEventListener("click", function() {
  counter += 1
  let div = document.createElement("div")
  div.textContent = "Hello"
  div.id = `counter${counter}`
  document.body.appendChild(div)
  console.log(div)

})

let string = "counter0"

for (const char of string) {
  array.push(char)
}

console.log(array)
console.log(counter)
if (array.includes(String(counter))) {
  console.log("Affirmative")
}

console.log(array[array.length - 1])