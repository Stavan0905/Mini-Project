document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('button');

  loginButton.addEventListener('click', () => {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    fetch('/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
     },
     body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(data => {
      if (data.success) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('role', data.role);

        if (data.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'DripStream_OTT.html';
        }
      } else {
        alert(data.message || 'Invalid username or password');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    });
  });
});
