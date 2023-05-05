import "./style.scss";

import TaskCategory from "./scripts/task_category";
import Task from "./scripts/declare_task";
import loadTasksToDom from "./scripts/load_task_to_dom";

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
  } else {
    console.log("Category exists");
  }
}

addCategoryToLocalStorage("Default", "All tasks may go here. Or you can create a new Category");
addCategoryToLocalStorage("Personal", "All Personal tasks may go here. Or you can create a new Category");

// New task initiate

// console.log(newTasks.details());

const newTasks = new Task("Finish project", "Complete the final report and submit it", "2023-06-30", "High", "Don't forget to include the updated charts", false);

// Task update
// newTasks.update("Finish project on time", null, "2023-06-28", "Urgent", null, false);

// Show details of the task

console.log(allCategories.Default.tasks);

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
  // window.location.reload();
}

/* addTasksToArray("Default", "Finish project 2", "Complete the final report and submit it", "2023-06-30", "High", "Don't forget to include the updated charts", true); */
/* Update Task */
function updateTask(id, title, description, dueDate, priority, notes, checkList) {
  const newTask = new Task(title, description, dueDate, priority, notes, checkList);
  defaultTasks[id] = newTask;

  localStorage.setItem("defaultTasks", JSON.stringify(defaultTasks));
  console.log("Task Updated");
  window.location.reload();
}

/* Delete Task */
// function deleteOneTask(id) {
//   if (window.confirm("Are you sure about deleting the task?")) {
//     defaultTasks.splice(id, 1);
//     localStorage.setItem("defaultTasks", JSON.stringify(defaultTasks));
//     console.log("Task Deleted");
//     window.location.reload();
//   }
// }

/* Show all tasks to DOM */

// loadTasksToDom(defaultTasks);

/* Change Completion Status */

// function changeCompletionStatus(id) {
//   if (window.confirm("Are you sure about changing completion status?")) {
//     defaultTasks[id].checkList = !defaultTasks[id].checkList;
//     // defaultTasks[id].checkList = true;
//     localStorage.setItem("defaultTasks", JSON.stringify(defaultTasks));
//     window.location.reload();
//   }
// }

// changeCompletionStatus(0);

// document.querySelectorAll(".changeCompletion").forEach((element) => {
//   element.addEventListener("click", () => {
//     const id = Number(element.dataset.key);
//     console.log(id);
//     changeCompletionStatus(id);
//   });
// });

/* Add and Update a task from Dom */

// document.getElementById("addTaskBtn").addEventListener("click", (e) => {
//   e.preventDefault();

//   const form = document.getElementById("addTaskForm");
//   const title = form.title.value;
//   const dueDate = form.date.value;
//   const description = form.details.value;
//   const priority = form.priority.value;
//   const notes = form.note.value;
//   const checkList = form.status.value === "true";

//   if (document.getElementById("addTaskForm").classList.contains("editTask")) {
//     const id = Number(form.dataset.key);
//     /* UPDATE TASK */
//     updateTask(id, title, description, dueDate, priority, notes, checkList);
//   } else {
//     /* ADD TASK */
//     /* console.log(title, details, date, priority, note, status); */
//     addTasksToArray(title, description, dueDate, priority, notes, checkList);
//   }
// });

/* Load task values to the form when edit task button is clicked */

// document.querySelectorAll(".editTask").forEach((element) => {
//   element.addEventListener("click", () => {
//     document.getElementById("addTaskBtn").innerText = "Update";
//     document.getElementById("ModalTitle").innerText = "Edit the Task";
//     const id = Number(element.dataset.key);

//     const form = document.getElementById("addTaskForm");
//     form.classList.add("editTask");
//     form.dataset.key = id;
//     form.title.value = defaultTasks[id].title;
//     // form.date.value = new Date(defaultTasks[id].dueDate);
//     // console.log(new Date(defaultTasks[id].dueDate));
//     const year = new Date(defaultTasks[id].dueDate).getFullYear();
//     const month = (new Date(defaultTasks[id].dueDate).getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
//     const date = new Date(defaultTasks[id].dueDate).getUTCDate();
//     console.log(`${year}-${month}-${date}`);
//     form.date.value = `${year}-${month}-${date}`;
//     // form.date.value = "2021-12-31";
//     form.details.value = defaultTasks[id].description;
//     form.priority.value = defaultTasks[id].priority;
//     form.note.value = defaultTasks[id].notes;
//     form.status.value = defaultTasks[id].checkList;
//     // console.log(new Date(defaultTasks[id].dueDate));
//   });
// });

/* Delete a task when delete button is clicked */

// document.querySelectorAll(".deleteTask").forEach((element) => {
//   element.addEventListener("click", () => {
//     // document.getElementById("addTaskBtn").innerText = "Update";
//     const id = Number(element.dataset.key);
//     deleteOneTask(id);
//   });
// });

/* Change text of form when Add Task button is clicked */

// document.getElementById("addTaskMenu").addEventListener("click", () => {
//   document.getElementById("addTaskBtn").innerText = "Submit";
//   document.getElementById("ModalTitle").innerText = "Add a Task";
// });

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
