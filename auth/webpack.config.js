const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "todos",
    projectName: "auth",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: {
      'todos-auth': path.resolve(
        process.cwd(),
        `src/todos-auth`
      ),
      'todos-header': path.resolve(
        process.cwd(),
        `src/todos-header`
      )
    },
    output: {
      filename: '[name].js',
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      uniqueName: 'todo-auth',
      devtoolNamespace: 'todo-auth',
      publicPath: "",
    },
    devServer: {
      port: 8500,
      onListening: ({ compiler }) => {
        const { https, client } = compiler.options.devServer;
        const { publicPath, filename } = compiler.options.output;
        const protocol = https ? "https://" : "http://";
        const port = 8502;
        const path = ["", "auto"].includes(publicPath) ? "/" : publicPath;
        console.log(
          `⚡️ single-spa application entry: ${protocol}${client.host}${port}${path}${filename}`
        );
      },
    },
    externals: ['@todos/shared-state'] 
  }); 
};
