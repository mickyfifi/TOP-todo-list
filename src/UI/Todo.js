import Todo from "../Todo.js";
import { format } from "date-fns";

export default class TodoUI {

    // todos - array
    constructor(todos) {
        this.todos = todos;
        this.todoListTab = document.querySelector('#todo-list');
        this.manageTodoTab = document.querySelector('#manage-todo');
        this.todoListTab.style.display = 'none';

        this.bindButtons();
        this.refresh();
    }

    refresh() {
        this.todoListTab.replaceChildren();

        for (const [index, todo] of this.todos.entries()) {
            const todoElement = document.createElement('div');

            todoElement.classList.add('todo');

            if (todo.priority == 4) {
                todoElement.style.backgroundColor = '#52574f';
            }

            if (todo.priority == 3) {
                todoElement.style.backgroundColor = '#4287f5';
            }

            if (todo.priority == 2) {
                todoElement.style.backgroundColor = '#4abd3a';
            }

            if (todo.priority == 1) {
                todoElement.style.backgroundColor = '#f57542';
            }

            todoElement.innerText = todo.title + '\n' + format(todo.dueDate, "yyyy-MM-dd");

            todoElement.addEventListener('click', () => {
                this.manageTodo(todo);
            });

            this.todoListTab.appendChild(todoElement);

        }

    }

    bindButtons() {
        const addTodoBtn = document.querySelector('#btn-add-todo');

        addTodoBtn.addEventListener('click', () => {
            this.manageTodo(false);
        });

        const backBtn = document.querySelector('#btn-manage-todo-back');

        backBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.manageTodoTab.style.display = 'none';
            this.todoListTab.style.display = 'grid';
        });

    }

    //todo - Todo
    manageTodo(todo) {
        this.todoListTab.style.display = 'none';
        this.manageTodoTab.style.display = 'flex';

        const titleField = document.querySelector('#field-title');
        const descField = document.querySelector('#field-desc');
        const dueDateField = document.querySelector('#field-due-date');
        const priorityField = document.querySelector('#field-priority');
        
        if (!todo) {
            this.manageTodoTab.reset();
        }

        // const formDataelement = document.querySelector('#manage-todo');
        // const formData = new FormData(this.manageTodoTab);
        // console.log(formData);  

        if (todo) {
            titleField.value = todo.title;
            descField.value = todo.description;
            dueDateField.value = format(todo.dueDate, "yyyy-MM-dd");
            priorityField.value = todo.priority;
        }

        this.manageTodoTab.addEventListener("submit", (e) => {
            e.preventDefault(); // stop page reload

            const formData = new FormData(this.manageTodoTab);

            
        });

    }


}
