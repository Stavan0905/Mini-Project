document.addEventListener('DOMContentLoaded', () => {
  // 🔐 Check login status
  const isLoggedIn = localStorage.getItem('loggedIn');
  if (isLoggedIn !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  // Logout button logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    });
  }

  //  Welcome message
  const username = localStorage.getItem('username');
  const welcome = document.getElementById('welcomeMessage');
  if (welcome && username) {
    welcome.textContent = `Welcome, ${username}!`;
  }

  // Fetch and render movie posters
  let allMovies = []; // Store for search filtering

  fetch('/api/dashboard')
    .then(res => res.json())
    .then(movies => {
      allMovies = movies;
      renderPosters(movies);
    })
    .catch(err => {
      console.error('Error loading dashboard:', err);
    });

  // Render posters function
  function renderPosters(movies) {
    const container = document.getElementById('trending');
    container.innerHTML = ''; // 🧹 Clears any existing content

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${movie.imageUrl}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
          </div>
          <div class="flip-card-back">
            <h3>${movie.title}</h3>
            <p>Genre: ${movie.genre || 'Unknown'}</p>
            <p>Year: ${movie.year || 'N/A'}</p>
            <p>Rating: ${movie.rating || '★★★☆☆'}</p>
            <button class="add-btn">+ Add to My Stuff</button>
          </div>
        </div>
      `;

      // Add button logic
      const addBtn = card.querySelector('.add-btn');
      addBtn.addEventListener('click', () => {
        const saved = JSON.parse(localStorage.getItem('myStuff')) || [];
        if (!saved.some(item => item.title === movie.title)) {
          saved.push(movie);
          localStorage.setItem('myStuff', JSON.stringify(saved));
          addBtn.textContent = '✔ Added';
          addBtn.disabled = true;
          addBtn.style.backgroundColor = '#2ecc71';
        } else {
          addBtn.textContent = '✔ Added';
          addBtn.disabled = true;
        }
      });

      container.appendChild(card);
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

    //  Filter posters by title
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );
      renderPosters(filtered);
    });

    //  Collapse on Escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        renderPosters(allMovies);
        searchInput.blur();
      }
    });
  }
});
