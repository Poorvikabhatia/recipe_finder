// 🔹 Backend API base URL
const API_BASE = "https://recipe-finder-api-a7zz.onrender.com";

// 🔹 Fun facts for "Did you know" box
const facts = [
  "Tomatoes are the most consumed vegetable in the world.",
  "Carrots were originally purple before becoming orange.",
  "Garlic has been used for thousands of years for its medicinal properties.",
  "Apples float in water because they are 25% air.",
  "Honey never spoils — it can last thousands of years!"
];

function updateFact() {
  const factBox = document.getElementById("factText");
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  factBox.textContent = randomFact;
}

// Update fun fact every 5 seconds
setInterval(updateFact, 5000);

let lastResults = [];

// 🔹 Search button logic
document.getElementById("searchBtn").addEventListener("click", () => {
  const ingredients = document.getElementById("ingredients").value.trim();
  if (!ingredients) {
    alert("Please enter some ingredients!");
    return;
  }

  // Call deployed backend API
  fetch(`${API_BASE}/api/recipes?query=${ingredients}`)
    .then(response => response.json())
    .then(data => {
      const recipesDiv = document.getElementById("recipes");
      recipesDiv.innerHTML = ""; // clear old results

      if (data.results && data.results.length > 0) {
        lastResults = data.results; // save results for "Surprise Me"
        data.results.forEach(recipe => {
          const card = document.createElement("div");
          card.classList.add("recipe-card");

          card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">
              View Recipe
            </a>
          `;
          recipesDiv.appendChild(card);
        });
      } else {
        lastResults = [];
        recipesDiv.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
      }

      // Update the fun fact after showing recipes
      updateFact();
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes. Check backend is running.");
    });
});

// 🔹 Surprise Me button logic
document.getElementById("surpriseBtn").addEventListener("click", () => {
  const recipeCards = document.querySelectorAll(".recipe-card");
  if (recipeCards.length === 0) {
    alert("Search for recipes first, then click Surprise Me!");
    return;
  }

  // Pick a random recipe
  const randomIndex = Math.floor(Math.random() * recipeCards.length);
  const randomRecipe = recipeCards[randomIndex];

  // Highlight the random recipe
  recipeCards.forEach(card => card.style.border = "none"); // reset borders
  randomRecipe.style.border = "3px solid orange";
  randomRecipe.scrollIntoView({ behavior: "smooth", block: "center" });
});
