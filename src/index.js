import "./style.scss";

import TaskCategory from "./scripts/task_category";
import Task from "./scripts/declare_task";
import loadTasksToDom from "./scripts/load_task_to_dom";

/* Related to back to top button */

import { displayButton, scrollToTop } from "./scripts/backToTop";

displayButton();
scrollToTop();

// New Task Category Instantiate

let allCategories = {};

if (localStorage.getItem("allCategories")) {
  allCategories = JSON.parse(localStorage.getItem("allCategories"));
} else {
  localStorage.setItem("allCategories", JSON.stringify(allCategories));
}

/* Add Category */
function addCategoryToLocalStorage(title, description) {
  if (!allCategories[title]) {
    const newCategory = new TaskCategory(title, description);

    allCategories[title] = newCategory;
    localStorage.setItem("allCategories", JSON.stringify(allCategories));
    console.log("New Category Added");
  } else if (title === "Default") {
    console.log("Task Tracker Running");
  } else {
    alert("Category exists");
  }
}

document.getElementById("addCategoryBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const CatName = document.getElementById("addCategoryForm").CatName.value;
  const catDetails = document.getElementById("addCategoryForm").categoryDetails.value;
  addCategoryToLocalStorage(CatName, catDetails);
  window.location.reload();
});

addCategoryToLocalStorage("Default", "All tasks may go here. Or you can create a new Category");
// addCategoryToLocalStorage("Personal", "All Personal tasks may go here. Or you can create a new Category");

// New task initiate

// console.log(newTasks.details());

// const newTasks = new Task("Finish project", "Complete the final report and submit it", "2023-06-30", "High", "Don't forget to include the updated charts", false);

// Task update
// newTasks.update("Finish project on time", null, "2023-06-28", "Urgent", null, false);

// Show details of the task

// Saving tasks to an array

// const defaultTasks = JSON.parse(localStorage.getItem("defaultTasks").tasks);

/* if (localStorage.getItem("defaultTasks")) {
  defaultTasks = JSON.parse(localStorage.getItem("defaultTasks"));
} */

/* Add Task */
function addTasksToArray(category, title, description, dueDate, priority, notes, checkList) {
  const newTask = new Task(title, description, dueDate, priority, notes, checkList);
  allCategories[category].tasks.push(newTask);
  localStorage.setItem("allCategories", JSON.stringify(allCategories));
  console.log("New Task Added");
  window.location.reload();
}

// addTasksToArray("Default", "Finish project 3", "Complete the final report and submit it", "2023-06-30", "High", "Don't forget to include the updated charts", true);
/* Update Task */
function updateTask(category, id, title, description, dueDate, priority, notes, checkList) {
  const newTask = new Task(title, description, dueDate, priority, notes, checkList);
  // The following will not work if there task category is changed
  // So we will not allow changing categories when editing tasks.
  allCategories[category].tasks[id] = newTask;

  localStorage.setItem("allCategories", JSON.stringify(allCategories));
  console.log("Task Updated");
  window.location.reload();
}

// updateTask("Default", 0, "Finish project 3", "Complete the final report and submit it", "2023-06-30", "High", "Don't forget to include the updated charts", false);

/* Delete Task */
function deleteOneTask(category, id) {
  if (window.confirm("Are you sure about deleting the task?")) {
    allCategories[category].tasks.splice(id, 1);
    localStorage.setItem("allCategories", JSON.stringify(allCategories));
    console.log("Task Deleted");
    window.location.reload();
  }
}

// deleteOneTask("Default", 0);

/* Change Completion Status */

function changeCompletionStatus(category, id) {
  if (window.confirm("Are you sure about changing completion status?")) {
    allCategories[category].tasks[id].checkList = !allCategories[category].tasks[id].checkList;
    // defaultTasks[id].checkList = true;
    localStorage.setItem("allCategories", JSON.stringify(allCategories));
    window.location.reload();
  }
}

function changeCompletionStatusEventListener() {
  document.querySelectorAll(".changeCompletion").forEach((element) => {
    element.addEventListener("click", () => {
      console.log("working");
      const id = Number(element.dataset.key);
      const categoryName = element.dataset.category;
      console.log(categoryName, id);
      changeCompletionStatus(categoryName, id);
    });
  });
}
setTimeout(() => {
  changeCompletionStatusEventListener();
}, 100);

// changeCompletionStatus(0);
// changeCompletionStatus("Default", 0);

/* Show all tasks to DOM */
function loadCategorySpecificTaskToDom(category = "Default") {
  document.getElementById("all-tasks").innerHTML = "";
  loadTasksToDom(allCategories[category]);
}

// loadCategorySpecificTaskToDom("Personal");

if (localStorage.getItem("loadItemsFromCategory")) {
  loadCategorySpecificTaskToDom(localStorage.getItem("loadItemsFromCategory"));
} else {
  loadCategorySpecificTaskToDom();
}

/* ////////////////////////////////////////////////////////////////////////////
////////////////////  AWESOME CODE BELOW ! WOO! ////////////////////////////
//////////////////////////////////////////////////////////////////////////// */

// Finding all categories name from allCategories Object

const nameOfCategories = Object.keys(allCategories);
// console.log(nameOfCategories);

// #nav-dropdown-menu
let navCategories = ``;

// #addTaskCategories
let addModalDropDown = ``;

nameOfCategories.forEach((element) => {
  navCategories += ` <li data-category="${element}"  class="loadCategorySpecificTasks"><a  class=" dropdown-item link-warning" href="#${element}">${element}</a></li> `;
  addModalDropDown += `<option class="bg-warning" value="${element}">${element}</option>`;
});

document.getElementById("nav-dropdown-menu").innerHTML = navCategories;
document.getElementById("addTaskCategories").innerHTML = addModalDropDown;

/* ////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// */

/* Add and Update a task from Dom */

document.getElementById("addTaskBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.getElementById("addTaskForm");
  const title = form.title.value;
  let category = form.Category.value;
  const dueDate = form.date.value;
  const description = form.details.value;
  const priority = form.priority.value;
  const notes = form.note.value;
  const checkList = form.status.value === "true";

  console.log(title, category, description, dueDate, priority, notes, checkList);

  if (document.getElementById("addTaskForm").classList.contains("editTask")) {
    const id = Number(form.dataset.key);
    category = form.dataset.category;
    /* UPDATE TASK */
    updateTask(category, id, title, description, dueDate, priority, notes, checkList);
  } else {
    /* ADD TASK */
    /* console.log(title, details, date, priority, note, status); */
    addTasksToArray(category, title, description, dueDate, priority, notes, checkList);
  }
});

// console.log(allCategories.Default.tasks[0].dueDate);

/* Delete a task when delete button is clicked */

document.querySelectorAll(".deleteTask").forEach((element) => {
  element.addEventListener("click", () => {
    // document.getElementById("addTaskBtn").innerText = "Update";
    const id = Number(element.dataset.key);
    const categoryName = element.dataset.category;
    deleteOneTask(categoryName, id);
  });
});

/* Change text of form when Add Task button is clicked */

document.getElementById("addTaskMenu").addEventListener("click", () => {
  document.getElementById("selectCategoryWhileAdd").style.display = "block";
  document.getElementById("addTaskBtn").innerText = "Submit";
  document.getElementById("ModalTitle").innerText = "Add a Task";

  if (document.getElementById("addTaskForm").classList.contains("editTask")) {
    document.getElementById("addTaskForm").classList.remove("editTask");
  }

  const form = document.getElementById("addTaskForm");
  form.dataset.key = "";
  form.dataset.category = "";
  form.title.value = "";

  form.date.value = "";
  form.details.value = "";
  form.priority.value = "";
  form.note.value = "";
  form.status.value = "";
});

// Load Edit task button event listener

/* Load task values to the form when edit task button is clicked */
function edtiTaskButtonEventListener() {
  document.querySelectorAll(".editTask").forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log("Does it work?");
      document.getElementById("selectCategoryWhileAdd").style.display = "none";
      document.getElementById("addTaskBtn").innerText = "Update";
      document.getElementById("ModalTitle").innerText = "Edit the Task";
      const id = Number(element.dataset.key);
      const categoryName = element.dataset.category;

      const form = document.getElementById("addTaskForm");
      if (!document.getElementById("addTaskForm").classList.contains("editTask")) {
        document.getElementById("addTaskForm").classList.add("editTask");
      }

      form.dataset.key = id;
      form.dataset.category = categoryName;
      form.title.value = allCategories[categoryName].tasks[id].title;
      // form.date.value = new Date(defaultTasks[id].dueDate);
      // console.log(new Date(defaultTasks[id].dueDate));
      const year = new Date(allCategories[categoryName].tasks[id].dueDate).getFullYear();
      const month = (new Date(allCategories[categoryName].tasks[id].dueDate).getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
      const date = new Date(allCategories[categoryName].tasks[id].dueDate).getUTCDate();
      console.log(`${year}-${month}-${date}`);
      form.date.value = `${year}-${month}-${date}`;
      // form.date.value = "2021-12-31";
      form.details.value = allCategories[categoryName].tasks[id].description;
      form.priority.value = allCategories[categoryName].tasks[id].priority;
      form.note.value = allCategories[categoryName].tasks[id].notes;
      form.status.value = allCategories[categoryName].tasks[id].checkList;
      // console.log(new Date(defaultTasks[id].dueDate));
    });
  });
}

setTimeout(() => {
  edtiTaskButtonEventListener();
}, 500);

/* ////////////////////////////////////////////////////////////////////////////
////////////////////  Load Category Specific Tasks ////////////////////////////
//////////////////////////////////////////////////////////////////////////// */

/* Functionlity below causes edit button on taks card not to work. Not sure why. I am loading all tasks on the homepage instead */
document.querySelectorAll(".loadCategorySpecificTasks").forEach((element) => {
  element.addEventListener("click", () => {
    // console.log(element.dataset.category);
    loadCategorySpecificTaskToDom(element.dataset.category);
    edtiTaskButtonEventListener();
    changeCompletionStatusEventListener();
    // Following is done so after updating any task value page will reload the same page otherwise it goes to homepage with default tasks
    localStorage.setItem("loadItemsFromCategory", element.dataset.category);
  });
});

document.querySelectorAll(".home").forEach((element) => {
  element.addEventListener("click", () => {
    localStorage.setItem("loadItemsFromCategory", "");
    window.location.reload();
  });
});

/* ////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// */

// New task initiate

/* addTasksToArray("Finish project", "Complete the final report and submit it", "2023-06-30", "High", "Don't forget to include the updated charts", false);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true);
addTasksToArray("Design the Site", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-30", "High", "It is required to get a new job", true); */

// Task update
/* updateTask(0, "Finish project on time", "Some quick example text to build on the card title and make up the bulk of the card's content.", "2023-06-28", "Urgent", "It is required to get a new job", false); */

// Show details of the task

/* console.log(defaultTasks[0].details()); */
