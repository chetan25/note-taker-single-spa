---
title: Practice Single SPA.
excerpt: Just a simple repo to try out basic concepts in Single SPA.
Tools: ["React", "VUE", Webpack', "RXJS", "SINGEL-SPA", "chakra-ui"]
---

# Just tried Basic concepts from Single SPA

### Local Development

- `root` - `npm start` - will serve at port 9000
- `auth` - `npm start` - will serve at port 8502
- `shared-state` - `npm start` - will serve at port 8501
- `todo-details` - `npm serve` - will serve at port 8080
- `todo-editor` - `npm start` - will serve at port

#### Single SPA Loading Options

We can load micro frontends in Single SPA in different ways,we have explored two ways in this repo.

- The first is the default way that comes out of the box, where we define the micro frontends in the micro frontends layout html file and than in the root config file we import the layout file and loop through all the application element and register the application.

  ```js
  // html layout file
  <single-spa-router>
    <application name="@org/navbar"></application>;
  </single-spa-router>;

  // root config file
  const routes = constructRoutes(microfrontendLayout);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });
  applications.forEach(registerApplication);
  ```

- The second way is we specify where we want the application to be render in the html file. The id of the html element defines what micro frontend we want it to render. And then bootstrap the application in the config file. One thing to remember is if we don't specify the html element, the application would still be attached to the dom and that will depend on the order of it getting bootstrapped.

  ```js
  // html file
  <div id="single-spa-application:todos-header"></div>;

  // config file
  registerApplication(
    "todos-header",
    () => System.import("@todos/todos-header"),
    (location) => location.pathname.startsWith("/") // this decides on which route the bundle will be loaded in
  );
  ```

  We don't have to include all the Micro frontend in the root layout, we can load them in other micro frontend using the second option. For example in the repo we are loading the [todo-view-widget](todo-details/src/todo-view-widget.vue) in the [todos-todo-view](todo-editor/src/todos-todo-editor.tsx). Only thing is we just have to register it in the man root config.

```js
<div id="single-spa-application:todo-details-widget"></div>;

// config
registerApplication(
  "todo-details-widget",
  () => System.import("@todos/todo-details-widget"),
  (location) => location.pathname.startsWith("/details")
);
```

- We can also expose multiple components from a micro front end and load them in different views. We just have to add proper imports in the `system-js` import map and then just register and load it as normal app.

```js
 // index.ejs
  "@todos/root-config": "//localhost:9000/todos-root-config.js",
  "@todos/todo-editor": "//localhost:8500/todos-todo-editor.js",
  "@todos/todo-view": "//localhost:8500/todos-todo-view.js",

  // webpack config to have multiple entry
  entry: {
      'todos-todo-editor': path.resolve(
        process.cwd(),
        `src/todos-todo-editor`
      ),
      'todos-todo-view': path.resolve(
        process.cwd(),
        `src/todos-todo-view`
      )
  },

  // then we can just register and load the apps in the same way
```
