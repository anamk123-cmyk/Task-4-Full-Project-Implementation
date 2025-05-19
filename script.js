// Theme color picker
const colorInput = document.getElementById("theme-color");
colorInput.addEventListener("input", () => {
  document.documentElement.style.setProperty('--accent', colorInput.value);
});

// To-Do App
function addTask() {
  const task = document.getElementById("todo-input").value.trim();
  const date = document.getElementById("todo-date").value;
  if (!task) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task, date });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("todo-input").value = '';
  document.getElementById("todo-date").value = '';
  loadTasks();
}

function loadTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.task} ${item.date ? `(Due: ${item.date})` : ''}</span>
      <button onclick="removeTask(${index})">X</button>
    `;
    list.appendChild(li);
  });
}

function removeTask(i) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

loadTasks();

// Products
let products = [
  { name: "Laptop", category: "tech", price: 999, rating: 4.5 },
  { name: "Sneakers", category: "fashion", price: 80, rating: 4.2 },
  { name: "Smartphone", category: "tech", price: 799, rating: 4.6 },
  { name: "Jacket", category: "fashion", price: 120, rating: 4.1 }
];

function renderProducts(list) {
  const container = document.getElementById("product-container");
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h4>${p.name}</h4>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <p>Rating: ${p.rating}</p>`;
    container.appendChild(div);
  });
}

function filterProducts() {
  const category = document.getElementById("category-filter").value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

function sortProducts() {
  const sort = document.getElementById("sort-filter").value;
  let sorted = [...products];
  if (sort === "price") sorted.sort((a, b) => a.price - b.price);
  else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  renderProducts(sorted);
}

function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

renderProducts(products);
