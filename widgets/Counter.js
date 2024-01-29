import { html, useState, useEffect } from "../util/preactCentral.js";

export default function Counter({ userData }) {
  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return html`
    <p>
      ${Object.keys(userData).length
        ? userData.user.displayName
        : "User Not Logged In"}
    </p>
  `;
}
