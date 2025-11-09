document.addEventListener('DOMContentLoaded', () => {
  //  TV show data
  const tvShows = [
    { title: 'Murder Mubarak', imageUrl: 'murder_mubarak.jpg', genre: 'Mystery', year: 2024, rating: '8.2' },
    { title: 'The Green Knight', imageUrl: 'green.jpeg', genre: 'Adventure', year: 2021, rating: '7.1' },
    { title: 'The Wolf Of Wall Street', imageUrl: 'wall_street.jpg', genre: 'Biography', year: 2013, rating: '8.2' },

    { title: 'Spiderman : Home Coming', imageUrl: 'spiderman.jpg', genre: 'Action', year: 2017, rating: '7.4' },
    { title: 'Desi Boys', imageUrl: 'Desi_Boyz.webp', genre: 'Comedy', year: 2011, rating: '6.0' },
    { title: 'Archer', imageUrl: 'Archer.jpg', genre: 'Action', year: 2010, rating: '8.6' },
    { title: 'Lord', imageUrl: 'Lord.jpg', genre: 'Drama', year: 2005, rating: '7.7' },
    { title: 'I', imageUrl: 'I.jpg', genre: 'Romance', year: 2015, rating: '6.8' },
    { title: '12 Angry Men', imageUrl: '12.jpg', genre: 'Drama', year: 1957, rating: '9.0' }
  ];

  const tvGrid = document.getElementById('tvGrid');

  // Render flip cards
  function renderTVShows(shows) {
    tvGrid.innerHTML = '';
    shows.forEach(show => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="images/${show.imageUrl}" alt="${show.title}" />
          </div>
          <div class="flip-card-back">
            <h3>${show.title}</h3>
            <p><strong>Genre:</strong> ${show.genre}</p>
            <p><strong>Year:</strong> ${show.year}</p>
            <p><strong>Rating:</strong> ⭐ ${show.rating}</p>
            <button class="add-btn">+ Add to My Stuff</button>
          </div>
        </div>
      `;

      // Add button logic
      card.querySelector('.add-btn').addEventListener('click', () => {
        const saved = JSON.parse(localStorage.getItem('myStuff')) || [];
        if (!saved.some(item => item.title === show.title)) {
          saved.push(show);
          localStorage.setItem('myStuff', JSON.stringify(saved));
          alert(`${show.title} added to My Stuff!`);
        } else {
          alert(`${show.title} is already in My Stuff.`);
        }
      });

      tvGrid.appendChild(card);
    });
  }

  renderTVShows(tvShows); // Initial render

  // Logout button logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    });
  }

  // Search bar toggle
  const searchToggle = document.getElementById('searchToggle');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.getElementById('searchInput');

  if (searchToggle && searchInput && searchContainer) {
    searchToggle.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      searchInput.focus();
    });

    // Filter posters by title
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = tvShows.filter(show =>
        show.title.toLowerCase().includes(query)
      );
      renderTVShows(filtered);
    });

    // Collapse on Escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        renderTVShows(tvShows);
        searchInput.blur();
      }
    });
  }
});
