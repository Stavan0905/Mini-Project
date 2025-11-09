//  Catalog grouped by categories
const catalog = {

  action: [
    { title: "Action Blast", thumbnail: "https://via.placeholder.com/200x300?text=Action+1" },
    { title: "Hero Returns", thumbnail: "https://via.placeholder.com/200x300?text=Action+2" }
  ],
  comedy: [
    { title: "Funny Times", thumbnail: "https://via.placeholder.com/200x300?text=Comedy+1" },
    { title: "Laugh Out Loud", thumbnail: "https://via.placeholder.com/200x300?text=Comedy+2" }
  ],
  new: [
    { title: "New Hit 2025", thumbnail: "https://via.placeholder.com/200x300?text=New+1" },
    { title: "Fresh Release", thumbnail: "https://via.placeholder.com/200x300?text=New+2" }
  ]
};

//  Load posters dynamically into carousels
function loadCatalog() {
  for (let category in catalog) {
    const container = document.getElementById(category);
    catalog[category].forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" />
        <div class="overlay">
          <h3>${item.title}</h3>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

//  Mock login function
function login() {
  const username = document.getElementById("username").value;
  if (username) {
    alert(`Welcome, ${username}!`);
  } else {
    alert("Please enter a username");
  }
}

//  Initialize on page load
loadCatalog();
