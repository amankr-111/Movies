function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    card.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Year: ${movie.year}</p>
        <p>Type: ${movie.type}</p>
        <img src="${movie.poster}" alt="${movie.title} Poster">
    `;

    return card;
}

async function displayMovies() {
    const apiUrl = 'http://localhost:3000/favorites';

    try {
        const response = await fetch(apiUrl);
        const movies = await response.json();

        if (Array.isArray(movies)) {
            const movieContainer = document.getElementById('movieContainer');
            movies.forEach(movie => {
                const card = createMovieCard(movie);
                movieContainer.appendChild(card);
            });
        } else {
            console.error('Invalid data received from the server');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.addEventListener('load', displayMovies);
