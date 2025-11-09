document.addEventListener('DOMContentLoaded', () => {
  const myStuffGrid = document.getElementById('myStuffGrid');
  const myStuff = JSON.parse(localStorage.getItem('myStuff')) || [];

  // For no movies saved
  if (myStuff.length === 0) {
    myStuffGrid.innerHTML = `<p>No saved movies yet. Go to <a href="movies.html">Movies</a> and add some!</p>`;
    return;
  }

  // Render each saved movie
  myStuff.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${movie.imageUrl.startsWith('images/') ? movie.imageUrl : 'images/' + movie.imageUrl}" alt="${movie.title}" />
          </div>
          <div class="flip-card-back">
            <h3>${movie.title}</h3>
            <p>Genre: Action</p>
            <p>Year: 2023</p>
            <p>Rating: ★★★★☆</p>
            <button class="remove-btn">Remove</button>
          </div>
        </div>
      </div>
    `;
    myStuffGrid.appendChild(card);
  });

  // Remove from My Stuff
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const title = e.target.closest('.flip-card-back').querySelector('h3').textContent;
      let updatedList = JSON.parse(localStorage.getItem('myStuff')) || [];
      updatedList = updatedList.filter(item => item.title !== title);
      localStorage.setItem('myStuff', JSON.stringify(updatedList));
      e.target.closest('.movie-card').remove();

      if (updatedList.length === 0) {
        myStuffGrid.innerHTML = `<p>No saved movies left. Go to <a href="movies.html">Movies</a> and add some!</p>`;
      }
    });
  });

  // Logout logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    });
  }
});
