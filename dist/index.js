const todaysDayEl = document.querySelector('.todays-day');
const todaysDateEl = document.querySelector('.todays-date');
const todaysMonthEl = document.querySelector('.calendar-container calendar h3');
const calendarEl = document.querySelector('.calendar');
const taskForm = document.getElementById('task-form');
const taskTitleEl = document.getElementById('task-title');
const taskDescEl = document.getElementById('task-desc');
const taskTimeEl = document.getElementById('task-time');
const taskContainer = document.querySelector('.tasks');
const totalTasksEl = document.querySelector('.summary-card.total p');
const pendingTasksEl = document.querySelector('.summary-card.pending p');
const completedTasksEl = document.querySelector('.summary-card.completed p');
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const formatTo12Hour = (time) => {
    if (!time)
        return "";
    const parts = time.split(':');
    const hourStr = parts[0] ?? "0";
    const minute = parts[1] ?? "00";
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
};
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const createTask = (taskTitle, taskDesc, taskTime) => {
    if (!taskTitleEl || !taskDescEl || !taskTimeEl)
        return;
    const newTask = {
        taskTitle,
        taskDesc,
        taskTime: formatTo12Hour(taskTime),
        status: 'pending'
    };
    tasks.push(newTask);
    saveTasks();
    taskTitleEl.value = '';
    taskDescEl.value = '';
    taskTimeEl.value = '';
    renderTasks(tasks);
};
const renderTasks = (tasks) => {
    if (!taskContainer)
        return;
    taskContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <div class="task ${task.status}" data-id="${index}">
                <div class="task-main">
                    <h3>
                        <i class="fa-solid fa-clipboard-list"></i>
                        <span class="task-title">${task.taskTitle}</span>
                    </h3>
                    <p class="time">
                        <i class="fa-solid fa-clock"></i>
                        <span class="task-time">${task.taskTime}</span>
                    </p>
                    <p class="desc">
                        <i class="fa-solid fa-align-left"></i>
                        <span class="task-desc">${task.taskDesc}</span>
                    </p>
                </div>

                <div class="task-actions">
                    <button class="btn btn-complete" aria-label="Mark complete" title="Complete">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="btn btn-edit" aria-label="Edit task" title="Edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-delete" aria-label="Delete task" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        taskContainer.innerHTML += taskHTML;
    });
    attachTaskEvents();
    updateSummary();
};
const attachTaskEvents = () => {
    if (!taskContainer)
        return;
    const taskEls = taskContainer.querySelectorAll('.task');
    taskEls.forEach((taskEl) => {
        const index = parseInt(taskEl.dataset.id || '0');
        const completeBtn = taskEl.querySelector('.btn-complete');
        completeBtn?.addEventListener('click', () => {
            if (tasks[index]) {
                tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
            }
            saveTasks();
            renderTasks(tasks);
        });
        const deleteBtn = taskEl.querySelector('.btn-delete');
        deleteBtn?.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks(tasks);
        });
        const editBtn = taskEl.querySelector('.btn-edit');
        editBtn?.addEventListener('click', () => {
            const task = tasks[index];
            if (!task)
                return;
            taskTitleEl.value = task.taskTitle;
            taskDescEl.value = task.taskDesc;
            taskTimeEl.value = task.taskTime;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks(tasks);
        });
    });
};
const updateSummary = () => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    if (totalTasksEl)
        totalTasksEl.textContent = total.toString();
    if (pendingTasksEl)
        pendingTasksEl.textContent = pending.toString();
    if (completedTasksEl)
        completedTasksEl.textContent = completed.toString();
};
const today = new Date();
const renderCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    let daysHTML = "";
    for (let i = firstDay; i > 0; i--) {
        daysHTML += `<span class="inactive">${prevLastDate - i + 1}</span>`;
    }
    for (let d = 1; d <= lastDate; d++) {
        const today = new Date();
        const isToday = d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
        daysHTML += isToday
            ? `<span class="active">${d}</span>`
            : `<span>${d}</span>`;
    }
    const totalCells = firstDay + lastDate;
    const nextDays = 7 - (totalCells % 7 === 0 ? 7 : totalCells % 7);
    for (let j = 1; j <= nextDays; j++) {
        daysHTML += `<span class="inactive">${j}</span>`;
    }
    return `<div class="dates">${daysHTML}</div>`;
};
document.addEventListener('DOMContentLoaded', () => {
    renderTasks(tasks);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    if (todaysDayEl) {
        todaysDayEl.textContent = days[today.getDay()];
    }
    if (todaysDateEl) {
        todaysDateEl.textContent = `${today.getDate()}, ${months[today.getMonth()]} ${today.getFullYear()}`;
    }
    if (todaysMonthEl) {
        todaysMonthEl.textContent = months[today.getMonth()];
    }
    if (!calendarEl)
        return;
    calendarEl.innerHTML += renderCalendar(today.getFullYear(), today.getMonth());
    if (!taskForm)
        return;
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createTask(taskTitleEl?.value || '', taskDescEl?.value || '', taskTimeEl?.value || '');
    });
});
export {};