import { html, useState, useEffect } from "../util/preactCentral.js";
import Loader from "./Loader.js";

export default function Article() {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const articleID = urlParams.get("id");

  const getArticle = async (id) => {
    if (!id) return;
    return fetch(`http://localhost:5000/api/widgets/articles/1`)
      .then((response) => response.json())
      .catch(() => {
        setError(
          "Something terrible happened, please try again or reach out to support."
        );
      });
  };

  useEffect(() => {
    getArticle(articleID).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

  if (error)
    return html`
      <div class="error-message">
        <h2 style="text-align:center; margin: .5rem 0;">Error</h2>
        <p style="text-align:center; margin: 0;">${error}</p>
      </div>
    `;

  return isLoading
    ? html`<${Loader} />`
    : article &&
        html`<div dangerouslySetInnerHTML=${{ __html: article.Body }}></div>`;
}
