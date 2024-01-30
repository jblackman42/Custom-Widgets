import { html, useState, useEffect } from "../util/preactCentral.js";
import Loader from "./Loader.js";

export default function ArticleFinder() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    return fetch("http://localhost:5000/api/widgets/articles").then(
      (response) => response.json()
    );
  };

  useEffect(() => {
    getArticles().then((articles) => {
      console.log(articles);
      setArticles(articles);
      setIsLoading(false);
    });
  }, [setIsLoading, setArticles]);

  return isLoading
    ? html`<${Loader} />`
    : articles.map((article) => {
        const { PHC_Article_ID, Title, Display_Name, Topic } = article;
        return html`
          <a class="article-card" href="/src/index.html/?id=1">
            <div class="background-image-container">
              <img
                src="http://localhost:5000/api/widgets/article-graphic/${PHC_Article_ID}"
                alt="${Title}"
              />
            </div>
            <div class="article-content">
              <p>${Topic}</p>
              <h1>${Title}</h1>
              <p>${Display_Name}</p>
            </div>
          </a>
        `;
      });
}
