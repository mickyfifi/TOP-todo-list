import Todo from "../Todo.js";
import Project from "../Project.js";
import { format } from "date-fns";
import DataManager from "../DataManager.js";

export default class TodoUI {

    // project - Project class
    constructor(project, dataManager) {
        this.project = project;
        this.todos = project.todos;
        this.dataManager = dataManager;
        this.todoListTab = document.querySelector('#todo-list');
        this.manageTodoTab = document.querySelector('#manage-todo');
        this.manageTodoTab.style.display = 'none';
        

        this.bindButtons();
        this.refresh();
    }

    refresh() {
        this.todoListTab.replaceChildren();

        const todos = this.todos.sort((a, b) => a.title.localeCompare(b.title));

        for (const [index, todo] of todos.entries()) {
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

        const deleteBtn = document.querySelector('#btn-delete-todo');

        if (!todo) {
            this.manageTodoTab.reset();
            deleteBtn.style.display = 'none';
        }

        if (todo) {
            titleField.value = todo.title;
            descField.value = todo.description;
            dueDateField.value = format(todo.dueDate, "yyyy-MM-dd");
            priorityField.value = todo.priority;

            deleteBtn.style.display = 'block';

            deleteBtn.onclick = (e) => {
                e.preventDefault();

                const index = this.todos.indexOf(todo);

                this.todos.splice(index, 1);

                // save
                // const stringSave = {'this.project.name' : JSON.stringify(this.todos)};
                // localStorage.setItem('projects', JSON.stringify(stringSave));
                this.dataManager.save();

                this.manageTodoTab.style.display = 'none';
                this.todoListTab.style.display = 'grid';
                this.refresh();

            }; 

        }

        this.manageTodoTab.onsubmit =  (e) => {
            e.preventDefault(); // stop page reload

            const formData = new FormData(this.manageTodoTab);

            const title = formData.get('field-title');
            const desc = formData.get('field-desc');
            const dueDate = new Date(formData.get('field-due-date'));
            const priority = parseInt(formData.get('field-priority'));

            if (!todo) {
                this.todos.push(new Todo(title, desc, dueDate, priority));
            }

            if (todo) {
                todo.title = title;
                todo.desc = desc;
                todo.dueDate = dueDate;
                todo.priority = priority;
            }

            //save
            // const stringSave = {'this.project.name' : JSON.stringify(this.todos)};
            // localStorage.setItem('projects', JSON.stringify(stringSave));
            this.dataManager.save();

            this.manageTodoTab.style.display = 'none';
            this.todoListTab.style.display = 'grid';
            this.refresh();
            
        };

    }


}
