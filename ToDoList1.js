
let todolist;

// Store todolist data in localstorage

if (localStorage.getItem('todolist')) {
   todolist = JSON.parse(localStorage.getItem('todolist'));
   displayTask();
}
else {
   todolist = [];
}

// Add New Todo Task in Array
function addTodoToArr() {
   var inputValue = document.getElementById("task_input").value;
   let found = false;
   todolist.map((todoItem) => {
      // found=true;
      // if(todoItem.value==inputValue.value){
      //    alert('Same TodoList is available in list')
      // }
   })
   if (!found) {
      todolist.push(inputValue);
      console.log(todolist);
   }


   if (inputValue === '') {
      alert("You must add Your ToDo");
   } else {
      displayTask();
   }
}
// Hide predisplay message when we add new todo
const emptylistMsg = document.getElementById('emptylist');
function emptylistMessage() {

   if (!todolist.length) {
      emptylistMsg.style.display = 'block';
   }
   else {
      emptylistMsg.style.display = 'none';
   }
}
emptylistMessage();

// Display new Todo in list Item


function displayTask() {

   const ul = document.getElementById('mylist');
   ul.innerHTML = '';
   todolist.map((todo, index) => {
      const li = document.createElement('li');
      li.id = `${index}ToDoTask`;
      li.innerHTML = todo;
      ul.appendChild(li);
      document.getElementById("task_input").value = "";

      // create Action Buttons

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x" viewBox="0 0 16 16">
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
         </svg>`;
      li.appendChild(deleteButton);
      deleteButton.onclick = function () {
         deleteToDo(index);
      }

      const editButton = document.createElement("button");
      editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-pencil-square" viewBox="0 0 16 16">
   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
 </svg>`;
      li.appendChild(editButton);
      editButton.onclick = function () {
         editTodo(index);
      }

      const checkButton = document.createElement("button");
      checkButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-check" viewBox="0 0 16 16">
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg>`;
      li.appendChild(checkButton);
      checkButton.onclick = function () {
         checkTodo(index);
      }

   })
   localStorage.setItem('todolist', JSON.stringify(todolist));
}


// Check Todo task and complete it.
function checkTodo(index) {

   console.log(document.getElementById(`${index}ToDoTask`));
   document.getElementById(`${index}ToDoTask`).classList.toggle("completed");
}

// Delete Todo Task from list
function deleteToDo(index) {
   todolist.splice(index, 1);
   displayTask();
   emptylistMessage();
}

// edit and update Todo Task
const popupMenu = document.getElementById('popup_menu');
const popupInput = document.querySelector("#popupInput");
const popupCancelbutton = document.querySelector("#cancel_btn");
const popupUpdatebutton = document.querySelector("#update_btn");

let editTodoIndex;
function editTodo(index) {
   editTodoIndex = index;

   popupMenu.style.display = 'block';
   const text = document.getElementById(`${index}ToDoTask`).textContent;
   const popupInputvalue = text.trim();
   document.getElementById('popupInput').value = popupInputvalue;
   console.log(text);

}

function updatePopup() {
   console.log(editTodoIndex, todolist[editTodoIndex]);

   if (popupInput.value.length) {
      const popupInputvalue = popupInput.value.trim();
      document.getElementById(`${editTodoIndex}ToDoTask`).innerText = `${popupInputvalue}`;
      todolist[editTodoIndex] = popupInputvalue;
      console.log(popupInputvalue);
      closePopup();
      displayTask();
   }
}

// Close Popup menu

function closePopup() {
   popupMenu.style.display = 'none';
}