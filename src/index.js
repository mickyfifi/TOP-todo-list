import './styles.css';
import Project from './Project.js';
import ProjectUI from './UI/Project.js';
import DataManager from './DataManager.js';

let projects = new Map();

// if (localStorage.getItem("projects") != null) {
//     let abc = localStorage.getItem("projects");
//     console.log(typeof abc);
//     console.log(abc);

// }

// localStorage.removeItem('project');

const dataManager = new DataManager(projects);
console.log(dataManager.loadToMap());
const projectUI = new ProjectUI(projects, dataManager);

