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

  const {
    PHC_Article_ID,
    Title,
    Author_Name,
    Author_Bio,
    Body,
    Publish_Date,
    Author_Contact_GUID,
    Author_Facebook_Account,
    Author_Instagram_Account,
    Author_Twitter_Account
  } = article;
  return isLoading
    ? html`<${Loader} />`
    : article &&
        html`
          <div class="article-card large">
            <div class="background-image-container">
              <img
                src="http://localhost:5000/api/widgets/article-graphic/${PHC_Article_ID}"
                alt="${Title}"
              />
            </div>
            <div class="article-card-content">
              <h1>${Title}</h1>
              <p class="right">${Author_Name}</p>
              <p class="left">${new Date(Publish_Date).toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            </div>
          </div>
          <div
            class="article-content"
            dangerouslySetInnerHTML=${{ __html: Body }}
          ></div>
          <div class="author-container">
            <div class="author-content">
              <img
                class="author-pfp"
                src="http://localhost:5000/api/widgets/author-graphic/${Author_Contact_GUID}"
              />
              <h2 class="author-name">${Author_Name}</h2>
            </div>
            <div class="author-bio">
              <p dangerouslySetInnerHTML=${{ __html: Author_Bio }}></p>
              <div class="author-socials">
                ${Author_Facebook_Account && html`<a href="#" target="_blank" style="color: #1877F2;"><i class="fa fa-facebook-square"></i></a>`}
                ${Author_Instagram_Account && html`<a href="#" target="_blank"><i class="fa fa-instagram" style="color: #d62976;"></i></a>`}
                ${Author_Twitter_Account && html`<a href="#" target="_blank"><i class="fa fa-twitter-square" style="color: #1DA1F2;"></i></a>`}
              </div>
            </div>
          </div>
        `;
}
