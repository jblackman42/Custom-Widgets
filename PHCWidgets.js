import { render, html, useState, useEffect } from "./util/preactCentral.js";
import widgetsRegistry from "./widgets/index.js";
import { setUser, subscribe, getUser } from "./util/globalUserState.js";

const authComponent = ({ component, props }) => {
  const [user, setUserState] = useState(getUser());

  useEffect(() => {
    const unsubscribe = subscribe((newUser) => {
      setUserState(newUser);
    });

    return () => unsubscribe();
  }, []);

  const updateGlobalUser = (newUserData) => {
    setUser(newUserData);
  };

  return html`<${component}
    ...${props}
    userData=${user}
    setUserData=${updateGlobalUser}
  />`;
};

document.addEventListener("DOMContentLoaded", () => {
  widgetsRegistry.forEach((widget) => {
    const { name, component, useAuth } = widget;

    document.querySelectorAll(name).forEach((elem) => {
      const props = {};
      for (const attribute of elem.attributes) {
        props[attribute.name] = attribute.value;
      }

      const renderComp = useAuth
        ? html`<${authComponent} component=${component} props=${props} />`
        : html`<${component} ...${props} />`;

      render(renderComp, elem);
    });
  });
});
