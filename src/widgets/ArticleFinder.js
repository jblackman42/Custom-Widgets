import { html, useState, useEffect } from "../util/preactCentral.js";
import Loader from "./Loader.js";

export default function ArticleFinder({ requestURL }) {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const [articleTopics, setArticleTopics] = useState({});
  const [selectedTopicID, setSelectedTopicID] = useState(0);
  
  const [authors, setAuthors] = useState({});
  const [selectedAuthorGuid, setSelectedAuthorGuid] = useState(0);

  const sortOptions = [
    {
      label: 'A-Z',
      sortFunc: (a,b) => a.Title < b.Title ? -1 : a.Title > b.Title ? 1 : 0
    },
    {
      label: 'Z-A',
      sortFunc: (a,b) => a.Title < b.Title ? 1 : a.Title > b.Title ? -1 : 0
    },
    {
      label: 'Newest to Oldest',
      sortFunc: (a,b) => new Date(b.Publish_Date) - new Date(a.Publish_Date)
    },
    {
      label: 'Oldest to Newest',
      sortFunc: (a,b) => new Date(a.Publish_Date) - new Date(b.Publish_Date)
    },
    {
      label: 'Random',
      sortFunc: () => Math.random() - 0.5
    }
  ];
  const [selectedSortOption, setSelectedSortOption] = useState(0);


  const getArticles = async () => {
    return fetch(`${requestURL}/api/widgets/articles`).then(
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
        if (!articleTopics[id]) setArticleTopics(x => ({...x, [id]: Topic}));

        const { Author_Contact_GUID: guid, Author_Name } = article;
        if (!authors[guid]) setAuthors(x => ({...x, [guid]: Author_Name}));
      });

      setIsLoading(false);
    });
  }, [setIsLoading, setArticles]);

  return isLoading
    ? html`<${Loader} />`
    : html`
      <div class="article-filters">
        <select value=${selectedTopicID} onChange=${(e) => setSelectedTopicID(parseInt(e.target.value))}>
          <option value="0" selected>All Topics</option>
          ${Object.entries(articleTopics).map(([key, value]) => {
            return html`
              <option value=${key}>${value}</option>
            `
          })}
        </select>

        <select defaultValue="0" value=${selectedAuthorGuid} onChange=${(e) => setSelectedAuthorGuid(e.target.value)}>
          <option value="0" selected>All Authors</option>
          ${Object.entries(authors).map(([key, value]) => {
            return html`
              <option value=${key}>${value}</option>
            `
          })}
        </select>

        <select value=${selectedSortOption} onChange=${(e) => setSelectedSortOption(parseInt(e.target.value))}>
          ${sortOptions.map((sortOption, i) => {
            return html`
              <option value=${i}>${sortOption.label}</option>
            `
          })}
        </select>
      </div>
      <div class="article-card-container">
        ${articles.filter(article => {
          return (selectedTopicID == 0 || article.PHC_Article_Topic_ID === selectedTopicID) && (selectedAuthorGuid == 0 || article.Author_Contact_GUID === selectedAuthorGuid);
        }).sort(sortOptions[selectedSortOption].sortFunc).map((article) => {
          const { PHC_Article_ID, Title, Author_Name, Topic } = article;
          return html`
            <a class="article-card" href="/src/index.html?id=1">
              <div class="background-image-container">
                <img
                  src="${requestURL}/api/widgets/article-graphic/${PHC_Article_ID}"
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
      </div>
    `
}
