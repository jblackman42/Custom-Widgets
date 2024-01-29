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
})();
