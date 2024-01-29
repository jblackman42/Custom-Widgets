import Counter from "./Counter.js";
import PHCLogin from "./PHCLogin.js";
// import { SeriesFinder, SeriesDetails } from "./SeriesWidgets.js";

export default [
  {
    name: "counter",
    component: Counter,
    useAuth: true, //if false, user object will not be accessible
  },
  {
    name: "phc-user-login",
    component: PHCLogin,
    useAuth: true,
  },
];
