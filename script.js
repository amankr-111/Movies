function displayMovieCards(movies) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (movies) {
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            card.innerHTML = `
                <h2>${movie.Title}</h2>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
                <button onclick="addToFavorites('${movie.Title}', '${movie.Year}', '${movie.Type}', '${movie.Poster}')">Favorite</button>
            `;

            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = 'No results found.';
    }
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchQuery = document.getElementById('searchInput').value;
    const apiUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=8847ef1f`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayMovieCards(data.Search);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

const apiUrl = 'http://localhost:3000/favorites'; 
function addToFavorites(title, year, type, poster) {
    const movieData = {
        title,
        year,
        type,
        poster,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error saving movie to favorites:', error);
    });
}


