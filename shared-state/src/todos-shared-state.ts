import { BehaviorSubject } from "rxjs";
import {  navigateToUrl } from "single-spa";

// Anything exported from this file is importable by other in-browser modules.
// export function publicApiFunction() {}


export const auth$ = new BehaviorSubject({
  sessionToken: null,
  error: false,
  pending: false,
});

export function login(username, password) {
    console.log(password);
    auth$.next({
      sessionToken: username,
      error: false,
      pending: false,
    });
    navigateToUrl('/details')
}