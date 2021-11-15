import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";



const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();

// if we don't specify the html element in the index.ejs by the id,
// the component will still load and render, based on the loading sequence

// registerApplication(
//   'todos-header',
//   () => System.import('@todos/todos-header'),
//   location => location.pathname.startsWith('/')
// );

// registerApplication(
//   'todo-details-widget',
//   () => System.import('@todos/todo-details-widget'),
//   location => location.pathname.startsWith('/')
// );

// registerApplication(
//   'todos-view',
//   () => System.import('@todos/todo-view'),
//   location => location.pathname.startsWith('/')
// );

// registerApplication(
//   'todo-details',
//   () => System.import('@todos/todo-details'),
//   location => location.pathname.startsWith('/')
// );


// registerApplication(
//   'todo-editor',
//   () => System.import('@todos/todo-editor'),
//   location => location.pathname.startsWith('/')
// );

start();

// this will switch the url to '/details' and load that application
// navigateToUrl('/details');