'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                    '<div class="todo-buttons">' +
                        '<button class="todo-remove"></button>' +
                        '<button class="todo-complete"></button>' +
                    '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoCompletedButton = li.querySelector('.todo-complete');
        const todoRemoveButton = li.querySelector('.todo-remove');

        todoCompletedButton.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        todoRemoveButton.addEventListener('click', function() {
            todoData.splice(todoData.indexOf(item), 1);
            render();
        });
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value.trim()) {
        const newTodo = {
            value: headerInput.value,
            completed: false        
        };
        
        todoData.push(newTodo);
        render();
    }

    todoControl.reset();
});

window.addEventListener('beforeunload', function() {
    const storageData = JSON.stringify(todoData);
    localStorage.setItem('storageData', storageData);
});

window.addEventListener('load', function() {
    const storageData = JSON.parse(localStorage.getItem('storageData'));
    
    if (storageData !== null) {
        todoData = storageData;
    }
    
    render();
});


