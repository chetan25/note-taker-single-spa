import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
// import Root from "./root.component";
//@ts-ignore
import { auth$ } from "@todos/shared-state";

const ViewRoot = () => {
  useEffect(() => {
    auth$.subscribe((data) => {
      console.log("auth data is", data);
    });
  });

  return (
    <section>
      <h2>View is here333</h2>
      <div id="single-spa-application:todo-details-widget"></div>
    </section>
  );
};
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ViewRoot,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
