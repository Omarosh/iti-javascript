


class ToDoList {
    constructor() {

        
addButton.addEventListener("click", addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
});

for (var i = 0; i < incompleteTasksHolder.children.length; i ++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }
  
  for (var i = 0; i < completedTasksHolder.children.length; i ++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

        this.init();
}
    init = () =>{
        incArray = JSON.parse(window.localStorage.getItem('inc'));
        comArray = JSON.parse(window.localStorage.getItem('com'));
        if(incArray === null)
          incArray = [];
        if(comArray === null)
          comArray = [];
          console.log(12);
          console.log(incArray);
          console.log(comArray);
        incArray.forEach(element => {
            loadTask(element);
        });
        comArray.forEach(element => {
          let listItem = loadTask(element);
          listItem.getElementsByTagName("button")[0].disabled = true;
          listItem.getElementsByTagName("input")[0].checked = true;
         completedTasksHolder.appendChild(listItem);
         bindTaskEvents(listItem, taskIncomplete);
        });
      }
}
var taskInput = document.getElementById("new-task"); 
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks"); 

let incArray = [];
let comArray = [];


function updateLocalStorage(){
  window.localStorage.setItem('inc', JSON.stringify(incArray));
  window.localStorage.setItem('com', JSON.stringify(comArray));
}


var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  
  checkBox.type = "checkBox";
  var deleteButton = document.createElement("button");

  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);

	return listItem;
}

function onlySpaces(str) {
    return /^\s*$/.test(str);
  }


  const  loadTask = (str) => {
        console.log("Load...");
        console.log(3333333333);
        console.log(str);
        console.log(incArray);
       
        var listItem = createNewTaskElement(str);
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        document.getElementById("text").innerHTML = "";
        return listItem;
  }

const addTask = () => {
    if(taskInput.value != "" && !onlySpaces(taskInput.value)){
        console.log("Add Task...");
        incArray.push(taskInput.value);
        console.log(3333333333);
        console.log(incArray);
        updateLocalStorage();
        var listItem = createNewTaskElement(taskInput.value);
      
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
        document.getElementById("text").innerHTML = "";
    }else{
        document.getElementById("text").innerHTML = "invalid input";
    }
  
}

var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    let temp =  listItem.getElementsByTagName("label")[0].textContent;
    


    for(let i =0; i<incArray.length; i++){
      if(temp === incArray[i]){
        incArray.splice(i,1);
        break;
      }
    }

    console.log(111);
    console.log(incArray);
    console.log(comArray);

    updateLocalStorage();
    ul.removeChild(listItem);
}

var taskCompleted = function() {
   console.log("Task Complete...");
   
   var listItem = this.parentNode;
   let temp =  listItem.getElementsByTagName("label")[0].textContent;

   for(let i =0; i<incArray.length; i++){
    if(temp === incArray[i]){
      incArray.splice(i,1);
      break;
    }
  }
  comArray.push(temp);
  console.log(111);
  console.log(incArray);
  console.log(comArray);
  updateLocalStorage();
  
  listItem.getElementsByTagName("button")[0].disabled = true;
   completedTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
  console.log("Task Incomplete...");
  var listItem = this.parentNode;

  let temp =  listItem.getElementsByTagName("label")[0].textContent;
   
   for(let i =0; i<comArray.length; i++){
    if(temp === comArray[i]){
      comArray.splice(i,1);
      break;
    }
  }
  incArray.push(temp);
  console.log(111);
  console.log(incArray);
  console.log(comArray);
  updateLocalStorage();

  listItem.getElementsByTagName("button")[0].disabled = false;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  	console.log("Bind List item events");
  	var checkBox = taskListItem.querySelector('input[type="checkbox"]');
      var deleteButton = taskListItem.querySelector("button.delete");

      deleteButton.onclick = deleteTask;
  	checkBox.onchange = checkBoxEventHandler;
  
}


const todo = new ToDoList();

  
  
  