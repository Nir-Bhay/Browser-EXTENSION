// Define the URLs for movie search
const websites = [
    {
        name: 'MoviesMod',
        url: 'https://moviesmod.bot/search/',
    },
    {
        name: 'TopMovies',
        url: 'https://topmovies.icu/search/',
    },
    {
        name: 'Soap2Day',
        url: 'https://ww17.soap2dayhd.co/search/?q=',
    },
    {
        name: 'GoMovies',
        url: 'https://gomovies.sx/search/',
        hasWatchButton: true,
    },
    {
        name: 'UHDMovies',
        url: 'https://uhdmovies.icu/search/',
        hasWatchButton: true,
    },
];

// Handle the search process
function searchMovie(movieName) {
    const searchQuery = encodeURIComponent(movieName);
    const resultsContainer = document.getElementById("results");

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Loop through each website and show the link
    websites.forEach(website => {
        const searchUrl = website.url + searchQuery;

        // Create a result item for each website
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        if (website.hasWatchButton) {
            resultItem.innerHTML = `${website.name}: <button class="watch-button" data-url="${searchUrl}">Watch</button>`;
        } else {
            resultItem.innerHTML = `${website.name}: <a href="${searchUrl}" target="_blank">Download</a>`;
        }

        resultsContainer.appendChild(resultItem);
    });

    // Attach event listeners to watch buttons
    attachEventListeners();
}

// Attach event listeners to watch buttons
function attachEventListeners() {
    const watchButtons = document.querySelectorAll('.watch-button');
    watchButtons.forEach(button => {
        button.addEventListener('click', function () {
            const url = this.getAttribute('data-url'); // Get URL from data attribute
            window.open(url, '_blank'); // Open in a new tab
        });
    });
}

// Handle the click event for the search button
function onSearchClick() {
    const movieName = document.getElementById("movie-input").value.trim();

    if (!movieName) {
        document.getElementById("message").innerText = "Please enter a movie name!";
        return;
    }

    // Show loading message
    document.getElementById("loading").style.display = 'block';
    document.getElementById("message").innerText = '';

    // Perform the search after a brief delay (to simulate processing)
    setTimeout(() => {
        searchMovie(movieName);
        document.getElementById("loading").style.display = 'none';
    }, 500);
}

// Initialize search button event listener
document.getElementById("search-button").addEventListener('click', onSearchClick);

