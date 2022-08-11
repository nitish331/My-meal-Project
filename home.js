// accessing all the variables
const searchBar = document.querySelector("input");
const mealContainer = document.getElementsByClassName("content");
const result = document.getElementsByClassName("result");
// Creating functions
async function displayMeal(dishName) {
  const url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + dishName;
  const response = await fetch(url);
  const data = await response.json();
  const meals = data.meals;
  if (meals == null) {
    result[0].style.visibility = "initial";
    return;
  } else {
    result[0].style.visibility = "hidden";
  }
  for (let meal of meals) {
    const html = `<div class="meal-card">
    <h3>${meal.strMeal}</h3>
    <div class="image">
      <img src=${meal.strMealThumb} alt="meal" />
    </div>
    <div class="button-container">
      <button data-id=${meal.idMeal} type="button">Get Details</button>
      <ion-icon data-id=${meal.idMeal} name="bookmarks-outline"></ion-icon>
    </div>
  </div>`;
    mealContainer[0].insertAdjacentHTML("beforeend", html);
  }
}

// Adding Event Listeners
searchBar.addEventListener("keyup", (e) => {
  mealContainer[0].innerHTML = "";
  if (e.target.value == "") {
    return;
  }

  displayMeal(e.target.value);
});
