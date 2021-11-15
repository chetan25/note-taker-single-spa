const path = require('path');

module.exports = {
    publicPath: '/',
    // outputDir: path.resolve(process.cwd(), "dist"),
    configureWebpack: {
      entry: {
        'app': path.resolve(
          process.cwd(),
          `src/main`
        ),
        'todo-view-widget': path.resolve(
          process.cwd(),
          `src/TodoWidget`
        )
      },
      output: {
        filename: 'js/[name].js',
        libraryTarget: "system",
        // path: path.resolve(process.cwd(), "dist/js"),
        // uniqueName: 'todo-details',
        devtoolNamespace: 'todo-details',
      },
      externals: ['@todos/shared-state'] 
    }
  }