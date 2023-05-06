function loadTasksToDom(category) {
  let elementForDom = "";
  const Tasks = category.tasks;

  elementForDom += `<h3 id=${category.title} class="mt-5 text-warning bg-dark p-5 text-center">Tasks of ${category.title} category.</h3><p class="lead text-center">${category.description}</p>`;

  Tasks.forEach((element, key) => {
    elementForDom += `<div class="card col-12 col-md-3 col-lg-2 col-xl-1 bg-dark text-white" style="width: 18rem">
          <div class="card-body ">
            <h5 class="card-title text-warning lead mt-3 mb-5  ">${element.title}</h5>
            <p class="card-subtitle small mb-2"><b class="text-warning lead">Due Date:</b> ${element.dueDate}</p>
            <p class="card-text ">${element.description}</p>
          </div>
          <ul class="list-group  list-group-flush">
            <li class="list-group-item text-light  border-light bg-transparent"><b class="text-warning">Priority:</b> ${element.priority}</li>
            <li class="list-group-item  text-light  border-light bg-transparent"><b class="text-warning">Note:</b> ${element.notes}</li>
            <li data-key="${key}" data-category="${category.title}" class="changeCompletion pt-5 list-group-item text-light  border-light bg-transparent">
              <b class="text-warning">Status : &nbsp; </b> ${element.checkList === true ? "<button class='statusChange btn ms-5 btn-outline-warning'><i class='bi   bi-check2-circle'> </i></button>" : "<button class='btn ms-5 btn-outline-warning'><i class='bi statusChange bi-x-circle'></i></button>"}   
            </li>
          </ul>
          <div class="d-flex pt-5 border-top  border-light  my-3 justify-content-center gap-3">
          <button data-category="${category.title}" data-key="${key}" id="editTask" data-bs-toggle="modal" data-bs-target="#exampleModal" class=" editIcon editTask btn d-block btn-outline-warning   "><i class="bi bi-pencil-fill"></i></button>
           <button data-category="${category.title}" data-key="${key}" id="deleteTask"  class=" deleteIcon deleteTask  btn d-block btn-outline-warning   "><i class="bi bi-trash3-fill"></i></button>
          </div>
          
        </div>`;
  });
  document.getElementById("all-tasks").innerHTML = elementForDom;
}

export default loadTasksToDom;
