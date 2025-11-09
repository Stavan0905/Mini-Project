document.addEventListener('DOMContentLoaded', () => {
  // Static movie data
  const movies = [
    { title: 'Challengers', imageUrl: 'challengers.jpg' },
    { title: 'Oppenheimer', imageUrl: 'oppenheimer.jpg' },
    { title: 'Moonlight', imageUrl: 'moonlight.jpg' },
    { title: 'F9', imageUrl: 'F9_film_poster.jpg' },
    { title: 'Kingsman: The Secret Service', imageUrl: 'kingsman the secret service.jpg' },
    { title: 'Kungfu Hustle', imageUrl: 'kungfu hustle.jpg' },
    { title: 'Us', imageUrl: 'us.jpg' }
  ];

  const movieGrid = document.getElementById('movieGrid');

  // Function to render movies
  function renderMovies(list) {
    movieGrid.innerHTML = '';
    list.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="images/${movie.imageUrl}" alt="${movie.title}" />
            </div>
            <div class="flip-card-back">
              <h3>${movie.title}</h3>
              <p>Genre: Action</p>
              <p>Year: 2023</p>
              <p>Rating: ★★★★☆</p>
              <button class="add-to-stuff-btn">Add to My Stuff</button>
            </div>
          </div>
        </div>
      `;
      movieGrid.appendChild(card);
    });

    // Handle "Add to My Stuff" button clicks
    document.querySelectorAll('.add-to-stuff-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const flipBack = e.target.closest('.flip-card-back');
        const movieTitle = flipBack.querySelector('h3').textContent;

        // Get correct image filename (no duplicate 'images/' issue)
        const imgElement = flipBack.parentElement.querySelector('img');
        const movieImg = imgElement.getAttribute('src').replace(/^images\//, '');

        let myStuff = JSON.parse(localStorage.getItem('myStuff')) || [];

        // Prevent duplicates
        if (!myStuff.some(item => item.title === movieTitle)) {
          myStuff.push({ title: movieTitle, imageUrl: movieImg });
          localStorage.setItem('myStuff', JSON.stringify(myStuff));
          alert(`${movieTitle} added to My Stuff!`);
        } else {
          alert(`${movieTitle} is already in My Stuff.`);
        }
      });
    });
  }

  renderMovies(movies);

  // My Stuff button logic
  const myStuffBtn = document.getElementById('myStuffBtn');
  if (myStuffBtn) {
    myStuffBtn.addEventListener('click', () => {
      window.location.href = 'mystuff.html';
    });
  }

  // Logout button logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    });
  }

  // Search bar toggle logic
  const searchToggle = document.getElementById('searchToggle');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.getElementById('searchInput');

  if (searchToggle && searchInput && searchContainer) {
    searchToggle.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      searchInput.focus();
    });

    //  Filter posters by title
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );
      renderMovies(filtered);
    });

    // Collapse on Escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        renderMovies(movies);
        searchInput.blur();
      }
    });
  }
});
