import { render, html, useState } from "./util/preactCentral.js";

import widgetsRegistry from "./widgets/index.js";


console.log(document.body)
const app = () => {
  
  return html`
    <h1>Hello World 3</h1>
    ${console.log(document.body)}
  `
}

// render(app(), document.body)

// const authComponent = ({component, props}) => {
//   const [user, setUser] = useState({});

//   return html`<${component} ...${props} user=${user} setUser=${setUser}/>`;
// }

// (() => {
//   widgetsRegistry.forEach((widget) => {
//     const { name, component } = widget;

//     document.querySelectorAll(name).forEach((elem) => {
//       // Create an object to hold the attributes
//       const props = {};

//       // Loop through attributes and add them to the props object
//       for (const attribute of elem.attributes) {
//         props[attribute.name] = attribute.value;
//       };

//       render(html`<${authComponent} component=${component} props=${props} />`, elem);
//     });
//   });
// })();