
var taskInput = document.getElementById("new-task"); 
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks"); 


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

var addTask = function() {
    if(taskInput.value != "" && !onlySpaces(taskInput.value)){
        console.log("Add Task...");
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

    ul.removeChild(listItem);
}

var taskCompleted = function() {
   console.log("Task Complete...");
   var listItem = this.parentNode;
   completedTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
  console.log("Task Incomplete...");
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


addButton.addEventListener("click", addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
});


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  	console.log("Bind List item events");
  	var checkBox = taskListItem.querySelector('input[type="checkbox"]');
      var deleteButton = taskListItem.querySelector("button.delete");

      deleteButton.onclick = deleteTask;
  	checkBox.onchange = checkBoxEventHandler;
  
}

for (var i = 0; i < incompleteTasksHolder.children.length; i ++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i ++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


  
  
  
  
  
  
  
  