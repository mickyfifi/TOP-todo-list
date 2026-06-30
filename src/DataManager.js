import Project from "./Project.js";

export default class DataManager {

    // projects - new Map(string, Project)
    constructor(projects) {
        this.name = 'projects';
        this.projects = projects;
        this.nameSelector = 'selector';
    }

    save() {
        localStorage.setItem(this.name, JSON.stringify(Object.fromEntries(this.projects)) );
        return true;
    }

    load() {
        const data = localStorage.getItem(this.name);
        return data;
    }

    saveSelector(selectedProject) {
        localStorage.setItem(this.nameSelector, selectedProject);
    }

    loadSelector() {
        const data = localStorage.getItem(this.nameSelector);
        return data;
    }

    getMap() {
        const data = this.load();

        if (!data) {
            return new Map();
        }

        console.log(data);
        const parsedData = JSON.parse(data);

        const projects = new Map();
        for (const [key, value] of Object.entries(parsedData)) {
            const project = new Project(key);

            project.addJsonArrayToTodos(value.todos)

            projects.set(key, project)
        }
                
        return projects;
    }

    clear() {
        localStorage.removeItem(this.name);
        localStorage.removeItem(this.nameSelector);
        this.projects = new Map();
    }

}