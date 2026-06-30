import './styles.css';
import Project from './Project.js';
import ProjectUI from './UI/Project.js';
import DataManager from './DataManager.js';

const dataManager = new DataManager(new Map());
dataManager.projects = dataManager.getMap();
const projectUI = new ProjectUI(dataManager.projects, dataManager);

