const categorySelector = document.getElementById("category-selector");
const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const bookmarkButton = document.getElementById("bookmark");
const favoritesList = document.getElementById("favorites-list");
const toggleThemeButton = document.getElementById("toggle-theme");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Fetch a random quote from the selected category
function getRandomQuote(category) {
  const categoryQuotes = quotes[category];
  if (categoryQuotes && categoryQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    const { quote, author } = categoryQuotes[randomIndex];
    displayQuote(quote, author);
  } else {
    quoteText.textContent = "No quotes found for this category.";
    authorText.textContent = "";
  }
}

// Display a quote
function displayQuote(quote, author) {
  quoteText.textContent = `"${quote}"`;
  authorText.textContent = `- ${author || "Unknown"}`;
}

// Add to favorites
function addToFavorites() {
  const favorite = {
    quote: quoteText.textContent,
    author: authorText.textContent,
  };
  favorites.push(favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

// Render favorites
function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((favorite) => {
    const li = document.createElement("li");
    li.textContent = `${favorite.quote} ${favorite.author}`;
    favoritesList.appendChild(li);
  });
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Event Listeners
newQuoteButton.addEventListener("click", () => getRandomQuote(categorySelector.value));
bookmarkButton.addEventListener("click", addToFavorites);
toggleThemeButton.addEventListener("click", toggleTheme);
categorySelector.addEventListener("change", () => getRandomQuote(categorySelector.value));

// Initial load
getRandomQuote(categorySelector.value);
renderFavorites();
