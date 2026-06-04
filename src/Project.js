import Todo from "./Todo.js";

export default class Project {

    constructor(name) {
        this.name = name;
        this.todos = [];
        this.add();
    }

    add() {
        this.todos.push(new Todo('A', 'B', new Date(2026, 3, 24), 1));
        this.todos.push(new Todo('B', 'C', new Date(2026, 3, 24), 2));
        this.todos.push(new Todo('C', 'D', new Date(2026, 3, 24), 3));
        this.todos.push(new Todo('D', 'E', new Date(2026, 3, 24), 4));
    }

}