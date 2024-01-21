const API_KEY = "1adae52a75c8419fb81077733698653a";
const url = "https://newsapi.org/v2/everything?q=";
console.log("JS");

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  // console.log(data);
  bindData(data.articles);
  console.log("Inside fetch news");
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  // console.log(articles);
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
  console.log("Inside bind data");
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.getElementById("news-img");
  const newsTitle = cardClone.getElementById("news-title");
  const newsSource = cardClone.getElementById("news-source");
  const newsDesc = cardClone.getElementById("news-desc");

  // console.log(article);

  if (newsImg) {
    newsImg.src = article.urlToImage;
    // console.log(newsImg.src);
  }

  if (newsTitle) {
    newsTitle.innerHTML = article.title;
  }

  if (newsDesc) {
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  }
  console.log("Inside fill data");
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  console.log(navItem);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
