document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("addTaskForm");
  const taskList = document.getElementById("tasks");
  const taskCounts = document.getElementById("taskCounts");
  const searchInput = document.getElementById("search");

  let tasks = [];

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    const task = {
      name: taskName,
      dueDate: dueDate,
      priority: priority,
      status: status,
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
  });

  function renderTasks() {
    taskList.innerHTML = "";
    taskCounts.innerHTML = "";

    const filteredTasks = filterTasks(searchInput.value);

    filteredTasks.forEach(function (task, index) {
      const li = document.createElement("li");
      li.classList.add("task");

      const taskNameInput = document.createElement("input");
      taskNameInput.type = "text";
      taskNameInput.value = task.name;

      const dueDateSpan = document.createElement("span");
      dueDateSpan.textContent = task.dueDate;

      const prioritySpan = document.createElement("span");
      prioritySpan.textContent = task.priority;

      const statusSpan = document.createElement("span");
      statusSpan.textContent = task.status;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        task.name = taskNameInput.value;
        renderTasks();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        tasks.splice(index, 1);
        renderTasks();
      });

      li.appendChild(taskNameInput);
      li.appendChild(dueDateSpan);
      li.appendChild(prioritySpan);
      li.appendChild(statusSpan);
      li.appendChild(editButton);
      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });

    updateTaskCounts();
  }

  function filterTasks(searchQuery) {
    return tasks.filter(function (task) {
      return task.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  function updateTaskCounts() {
    const taskStatusCounts = {
      todo: 0,
      inProgress: 0,
      done: 0,
    };

    const taskPriorityCounts = {
      high: 0,
      medium: 0,
      low: 0,
    };

    tasks.forEach(function (task) {
      taskStatusCounts[task.status]++;
      taskPriorityCounts[task.priority]++;
    });

    taskCounts.innerHTML = `
        <p>Tasks: ${tasks.length}</p>
        <p>To-do: ${taskStatusCounts.todo}</p>
        <p>In Progress: ${taskStatusCounts.inProgress}</p>
        <p>Done: ${taskStatusCounts.done}</p>
        <p>High Priority: ${taskPriorityCounts.high}</p>
        <p>Medium Priority: ${taskPriorityCounts.medium}</p>
        <p>Low Priority: ${taskPriorityCounts.low}</p>
      `;
  }

  searchInput.addEventListener("input", function () {
    renderTasks();
  });
});
