export default class DataManager {

    // projects - new Map(string, Project)
    constructor(projects) {
        this.name = 'projects';
        this.projects = projects;
    }

    save() {
        localStorage.setItem(this.name, JSON.stringify(Object.fromEntries(this.projects)) );
    }

    load() {
        const data = localStorage.getItem(this.name);
        return data;
    }

    loadToMap() {
        const data = this.load();
        console.log(data);
        const parsedData = JSON.parse(data);
        console.log(parsedData);

        
        const projects = new Map(Object.fromEntries(parsedData));
        return projects;
    }

    // saveTodo() {
    //     localStorage.setItem(this.name, JSON.stringify(Object.fromEntries(projects)) );
    // }

}