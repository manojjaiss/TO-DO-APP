//Elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// events
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //user entered value
    if (userEnteredValue.trim() != 0) { //user value isn't only spaces
        addBtn.classList.add("active"); //add button
    } else {
        addBtn.classList.remove("active"); //unactive add button
    }
}

showTasks(); //call showTask function

addBtn.onclick = () => { //user click on dass icon button
    let userEnteredValue = inputBox.value; //input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); //get localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
        listArray = []; //create blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transform json string into a js object
    }
    listArray.push(userEnteredValue); //push or add new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transform js object into a json string
    showTasks(); //call showTask function
    addBtn.classList.remove("active"); //unactive add button once the task added
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //pass the array length into pendingtask
    if (listArray.length > 0) { //array length is greater than 0
        deleteAllBtn.classList.add("active"); //active delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //add new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

// delete tsk function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}

// delete all tasks func
deleteAllBtn.onclick = () => {
    let getLocalStorageData = localStorage.getItem("New Todo"); //get localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
        listArray = []; //create blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transform json string into a js object
        listArray = []; //create blank array
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set item in localstorage
    showTasks(); //call showTasks function
}