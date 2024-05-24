function openDialog() {
  const overlay = document.getElementById('dialog-overlay');
  const cancelButton = document.getElementById('cancel-button');

  overlay.style.display = 'flex';

  cancelButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', () => {
    const inputValue = document.getElementById('input-field').value;
    const textareaValue = document.getElementById('textarea-field').value;
    console.log('Input:', inputValue);
    console.log('Textarea:', textareaValue);
    overlay.style.display = 'none';
  });
}

function clearLS() {
  localStorage.removeItem('inputs')
  listLocalStorageItems()
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
