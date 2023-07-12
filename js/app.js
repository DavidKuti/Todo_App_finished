// Creatinng Global variables
const addItemForm = document.querySelector(".form")
const inputItem = document.getElementById("item")
const itemLists = document.querySelector(".item-lists")
const inputSearch = document.getElementById("search")
let btn_submit = document.querySelector(".btn-submit")

if("list" in localStorage == false){
  const list_array = []
  localStorage.setItem("list", JSON.stringify(list_array))
}
// console.log(addItemForm)

if (JSON.parse(localStorage.getItem("list")).length == 0){
  const list_array = JSON.parse(localStorage.getItem("list"))
  list_array.push(
    {
      "No": 1,
      "Text": "Edit item"
    }
  )
  localStorage.setItem("list", JSON.stringify(list_array))
}

const list_array = JSON.parse(localStorage.getItem("list"))
for(let i = 0; i < 1; i++){
  itemLists.innerHTML += `
    <li class="list-group-item list_item_${i+1}">
      ${JSON.parse(localStorage.getItem("list"))[i].Text}
      <div class="list-actions">
        <button class="btn btn-edit">Edit</button>
      </div>
    </li>
  `
}

for(let i = 1; i < list_array.length; i++){
  itemLists.innerHTML += `
    <li class="list-group-item list_item_${i+1}">
      ${JSON.parse(localStorage.getItem("list"))[i].Text}
      <div class="list-actions">
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </li>
  `
}

// Add item
btn_submit.addEventListener("click", (e) => {
  e.preventDefault() //Prevents the page from reloading due to the form being submitted
  if (addItemForm.className == "form none"){
    e.preventDefault()
    const newItem = inputItem.value
    // alert(newItem)

    //Create a list element
    const li = document.createElement("li")

    // if (itemLists.children.length < 1){
    //   li.className = `list-group-item list_item_1`
    // }
    // else{
    let lastItem
    if(itemLists.children.length < 1){
      lastItem = (itemLists.children[0].classList.item(1).split(""))
    }
    else{
      lastItem = (itemLists.lastElementChild.classList.item(1).split(""))
    }
    let num_item = (Number(lastItem[lastItem.length - 1]))
    li.className = `list-group-item list_item_${num_item + 1}`
    const list_array_ = JSON.parse(localStorage.getItem("list"))

    if (inputItem.value === ""){
      alert("Invalid Input!")
      li.appendChild(newTextNode)
      const div = document.createElement("div")
      div.className = "list-actions"
  
      const btnDel = document.createElement("button")
      const btnEdit = document.createElement("button")
  
      btnDel.className = "btn btn-danger"
      btnDel.appendChild(document.createTextNode("Delete"))
  
      btnEdit.className = "btn btn-edit"
      btnEdit.appendChild(document.createTextNode("Edit"))
  
      div.appendChild(btnEdit)
      div.appendChild(btnDel)
  
      li.appendChild(div)
  
      itemLists.appendChild(li)
      li.remove()
      }
      else{
        list_array_.push({
          "No": num_item + 1,
          "Text": newItem
        })
        localStorage.setItem("list", JSON.stringify(list_array_))
    
        const localStorage_value = JSON.parse(localStorage.getItem("list"))[num_item]
        const newTextNode = document.createTextNode(localStorage_value.Text)
    
        li.appendChild(newTextNode)
        const div = document.createElement("div")
        div.className = "list-actions"
    
        const btnDel = document.createElement("button")
        const btnEdit = document.createElement("button")
    
        btnDel.className = "btn btn-danger"
        btnDel.appendChild(document.createTextNode("Delete"))
    
        btnEdit.className = "btn btn-edit"
        btnEdit.appendChild(document.createTextNode("Edit"))
    
        div.appendChild(btnEdit)
        div.appendChild(btnDel)
    
        li.appendChild(div)
    
        itemLists.appendChild(li)
        
        inputItem.value = ""
      }
    
    
  }
    
})

 

// Remove Items
itemLists.addEventListener("click", (e) => {
 if (e.target.classList.contains("btn-danger")){
  if(confirm("Item will be deleted")){
   const li = e.target.parentElement.parentElement
   const li_no = li.className.split("")
   const li_no_2 = (Number(li_no[li_no.length - 1]))
   itemLists.removeChild(li)
   if(itemLists.children.length > 1){
    itemLists.children[1].className = `list-group-item list_item_2`
    for(let i = 2; i < itemLists.children.length; i++){
      itemLists.children[i].className = `list-group-item list_item_${i+1}`
    }
   }
   addItemForm.className = "form none"    
   const list_array_ = JSON.parse(localStorage.getItem("list"))
   list_array_.splice(li_no_2-1,1)

   localStorage.setItem("list", JSON.stringify(list_array_))
  }
 }
})

// Search Item
inputSearch.addEventListener("keyup", (e) => {
 const searchText = e.target.value.toLowerCase()
 // console.log(searchText)

 const liGroup = document.getElementsByTagName("li")
 const liGroupArr = Array.from(liGroup)
 // console.log(liGroupArr)

 liGroupArr.forEach((item) => {
   const li = item.firstChild.textContent

   if (li.toLowerCase().indexOf(searchText) !== -1){
    item.style.display = "flex"
   }
   else{
    item.style.display = "none"
   }
 })
})

//Edit items

itemLists.addEventListener("click", (e) => {
 let item_name = e.target.parentElement.parentElement.firstChild
 let item__name = item_name.textContent.trim()
 const li = e.target.parentElement.parentElement
 let input = document.querySelector("input")
 if (e.target.classList.contains("btn-edit")){
  addItemForm.classList.remove("none")
  input.value = item__name
  // item__name = input.value;
  btn_submit.value = "Update"
  console.log(input.value)
  btn_submit.addEventListener("click", (k) => {
   if(addItemForm.classList.contains("none") === false){
    const items = document.querySelectorAll(".list-group-item")
    k.preventDefault()
    // console.log('Event', e.target.parentElement.parentElement)
    // e.target.parentElement.parentElement.firstChild.textContent = input.value
    //  item__name = input.value;
    for(let i = 0; i < items.length; i++){
      if(String(e.target.parentElement.parentElement.className) == items[i].className){
        items[i].textContent = input.value
        const div = document.createElement("div")
        div.className = "list-actions"
      
        const btnDel = document.createElement("button")
        const btnEdit = document.createElement("button")
      
        btnDel.className = "btn btn-danger"
        btnDel.appendChild(document.createTextNode("Delete"))
      
        btnEdit.className = "btn btn-edit"
        btnEdit.appendChild(document.createTextNode("Edit"))
      
        if(items[i].className === "list-group-item list_item_1"){
          div.appendChild(btnEdit)
        }

        if(items[i].className !== "list-group-item list_item_1"){
          div.appendChild(btnEdit)
          div.appendChild(btnDel)
        }
        

        items[i].appendChild(div)

        btn_submit.value = "Add"
        addItemForm.className = "form none"
        const li_no = li.className.split("")
        console.log(li_no)
        const li_no_2 = (Number(li_no[li_no.length - 1]))
        const list_array_ = JSON.parse(localStorage.getItem("list"))
        list_array_[li_no_2-1].Text = input.value
        input.value = ""
        

        localStorage.setItem("list", JSON.stringify(list_array_))

      }
    }
    // btn_submit.value = "Add"
    // addItemForm.className = "form none"
    // input.value = ""
   }
  })
 }
})