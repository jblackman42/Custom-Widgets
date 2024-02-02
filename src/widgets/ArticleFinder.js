import { html, useState, useEffect } from "../util/preactCentral.js";
import Loader from "./Loader.js";

export default function ArticleFinder() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const [articleTopics, setAriticleTopics] = useState({});

  const getArticles = async () => {
    return fetch("http://localhost:5000/api/widgets/articles").then(
      (response) => response.json()
    );
  };

  useEffect(() => {
    getArticles().then((articles) => {
      console.log(articles);
      setArticles(articles);

      // Save set of all article topics
      articles.forEach(article => {
        const { PHC_Article_Topic_ID: id, Topic } = article;
        if (!articleTopics[id]) setAriticleTopics(x => ({...x, [id]: Topic}))
      })

      setIsLoading(false);
    });
  }, [setIsLoading, setArticles]);

  console.log(articleTopics)

  return isLoading
    ? html`<${Loader} />`
    : html`
      <div class="article-filters">
        <select>
          ${Object.entries(articleTopics).map(([key, value]) => {
            console.log(key)
            return html`
              <option key="${key}">${value}</option>
            `
          })}
        </select>
      </div>
      ${articles.map((article) => {
        const { PHC_Article_ID, Title, Author_Name, Topic } = article;
        return html`
          <a class="article-card" href="/src/index.html?id=1">
            <div class="background-image-container">
              <img
                src="http://localhost:5000/api/widgets/article-graphic/${PHC_Article_ID}"
                alt="${Title}"
              />
            </div>
            <div class="article-card-content">
              <p>${Topic}</p>
              <h1>${Title}</h1>
              <p>${Author_Name}</p>
            </div>
          </a>
        `;
      })}
    `
}
