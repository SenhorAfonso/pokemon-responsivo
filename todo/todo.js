function openDialog(e) {
  const overlay = document.getElementById('dialog-overlay');
  const parentElement = e.target.parentElement;

  const taskTitle = parentElement.querySelector('h2').textContent;
  const taskDesc = parentElement.querySelector('p').textContent;

  const dialogInputTitle = document.querySelector('.input-title-dialog');
  const dialogInputDesc = document.querySelector('.input-desc-dialog');

  const cancelButton = document.getElementById('cancel-button');
  const submitButton = document.getElementById('submit-button');

  overlay.style.display = 'flex';
  dialogInputTitle.placeholder = taskTitle;
  dialogInputDesc.placeholder = taskDesc;

  cancelButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  submitButton.addEventListener('click', () => {
    const inputTitle = document.getElementById('input-field').value;
    const inputDesc = document.getElementById('textarea-field').value;

    parentElement.querySelector('h2').textContent = inputTitle;
    parentElement.querySelector('p').textContent = inputDesc;
    overlay.style.display = 'none';
  });
}

function clearLS() {
  localStorage.removeItem('inputs');
  listLocalStorageItems();
}

function listLocalStorageItems() {
  const arrayOfTasks = JSON.parse(localStorage.getItem('inputs'));
  const todoList = document.querySelector('.todo-list-container');
  todoList.innerHTML = '';

  arrayOfTasks.forEach((taskInfo) => {
    const taskItem = document.createElement('li');
    const taskContainer = document.createElement('div');
    const taskTitle = document.createElement('h2');
    const taskDesc = document.createElement('p');
    const editButton = document.createElement('button');

    taskTitle.textContent = taskInfo.taskTitle;
    taskDesc.textContent = taskInfo.taskDesc;
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDesc);
    taskContainer.appendChild(editButton);

    editButton.textContent = '✏️';
    editButton.title = 'Editar tarefa';
    editButton.onclick = console.log('oi');
    editButton.addEventListener('click', openDialog);
    editButton.classList.add('edit-button');

    taskItem.classList.add('task-item');
    taskItem.appendChild(taskContainer);
    todoList.appendChild(taskItem);
  });
}

function updateLocalStorage(inputs) {
  if (localStorage.getItem('inputs')) {
    let previousTasks = JSON.parse(localStorage.getItem('inputs'));
    previousTasks.push(inputs);
    localStorage.setItem('inputs', JSON.stringify(previousTasks));
  } else {
    console.log('não tinha');
    localStorage.setItem('inputs', JSON.stringify([inputs]));
  }

  listLocalStorageItems();
}

function submited() {
  const taskTitle = document.querySelector('#input-title').value;
  const taskDesc = document.querySelector('#input-desc').value;

  if (taskTitle && taskDesc) {
    updateLocalStorage({ taskTitle, taskDesc });
  }
}
