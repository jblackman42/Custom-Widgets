import { html, useState, useEffect } from "../util/preactCentral.js";

export default function Counter({ user }) {
  const [count, setCount] = useState(0);
  const add = (value) => setCount(count + value);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return html`
    <button onClick=${() => add(-1)}>Decrement</button>
    <input readonly size="4" value=${count} />
    <button onClick=${() => add(1)}>Increment</button>
    ${Object.keys(user).length && html`
      <h1>${user.user.displayName}</h1>
    `}
  `;
}
