import Todo from "./Todo.js";

export default class Project {

    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addJsonArrayToTodos(arr) {
        for (const value of arr) {
            this.todos.push(Object.assign(new Todo, value));
        }
    }

}