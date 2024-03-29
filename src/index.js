(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const cacheKey = urlParams.get("cacheKey");
  if (cacheKey) {
    sessionStorage.setItem("cachedKey", cacheKey);
  }
  const PHCWidgetsScript = document.createElement("script");
  PHCWidgetsScript.src = "./util/PHCWidgets.js";
  PHCWidgetsScript.type = "module";
  document.head.appendChild(PHCWidgetsScript);

  const PHCStyleTag = document.createElement("link");
  PHCStyleTag.rel = "stylesheet";
  PHCStyleTag.href = "./styles/main.css";
  document.head.appendChild(PHCStyleTag);
})();
