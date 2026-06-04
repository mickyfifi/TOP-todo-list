import Project from "../Project.js"
import TodoUI from "./Todo.js";

export default class ProjectUI {

    // projects - new Map(string, Project)
    constructor(projects) {
        this.projects = projects;
        if (this.projects.size == 0) {
            this.projects.set('Default', new Project('Default'));
        }

        this.selector = '';
        this.select(this.projects.keys().next().value);

        this.todoUI = new TodoUI(this.projects.get(this.selector).todos);

        this.onCreate();
        this.onSelect(() => {});
        this.onRemove();
        this.refresh();
    }

    refresh() {
        const projectList = document.querySelector('#project-list');

        projectList.replaceChildren();

        for (const [key, value] of this.projects) {
            const button = document.createElement('button');

            button.classList.add('button-28');
            button.textContent = key;

            projectList.appendChild(button);

            this.todoUI.refresh();
        }
    }

    create() {
        const name = prompt('Project Name?');

        if (this.projects.has(name)) {
            alert('Project creation failed - Name already exists!');
            return;
        }

        this.projects.set(name, new Project(name));

    }

    onCreate() {
        const buttonCreateProject = document.querySelector('#btn-create-project');

        buttonCreateProject.addEventListener('click', () => {
            this.create();
            this.refresh();
        });
    }

    onSelect(callbackFn) {
        const projectList = document.querySelector('#project-list');

        projectList.addEventListener('click', (event) => {

            if (!event.target) {
                return;
            }

            this.select(event.target.textContent);

            callbackFn(event.target.textContent);
        });

    }

    onRemove() {
        const button = document.querySelector('#btn-delete-project');

        button.addEventListener('click', () => {
            this.remove(this.selector);
        });
    }

    select(key) {
        this.selector = key;
        document.querySelector('#project-title').textContent = this.selector;
        this.todoUI = new TodoUI(this.projects.get(this.selector).todos);
    }

    remove(key) {
        if (this.projects.size == 1) {
            alert('Project deletion failed - You must have atleast 1 project!');
            return;
        }

        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        this.projects.delete(key);

        if (this.selector == key) {
            this.select(this.projects.keys().next().value);
        }

        this.refresh();
        
    }


}

