// accessing all the variables
const searchBar = document.querySelector("input");
const mealContainer = document.getElementsByClassName("content");
const result = document.getElementsByClassName("result");
const modal = document.getElementsByClassName("get-details");
const image = document.querySelector(".get-details .meals-image .image");
const reciepe = document.querySelector(".get-details .reciepe p");
const dishName = document.querySelector(".get-details .dish-name");
const watchVedio = document.querySelectorAll(
  ".get-details .container .btn-container button"
);
// Creating functions
async function getMealDetails(mealid) {
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealid;
  const response = await fetch(url);
  const data = await response.json();
  const [meal] = data.meals;
  image.style.backgroundImage = `url(${meal.strMealThumb})`;
  reciepe.innerText = meal.strInstructions;
  dishName.innerText = meal.strMeal;
  // adding event listener to watch-vedio button
  watchVedio[0].addEventListener("click", () => {
    window.open(meal.strYoutube);
  });
  // adding event listener to back-button
  watchVedio[1].addEventListener("click", () => {
    modal[0].style.visibility = "hidden";
  });
}
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
      <button data-id=${meal.idMeal}  type="button">Get Details</button>
      <ion-icon data-id=${meal.idMeal} name="bookmarks-outline"></ion-icon>
    </div>
  </div>`;
    mealContainer[0].insertAdjacentHTML("beforeend", html);
  }
  // Handling event listeners on all buttons to get details of the meals
  const getDetailButton = document.querySelectorAll(".button-container button");
  for (let btn of getDetailButton) {
    btn.addEventListener("click", (e) => {
      modal[0].style.visibility = "visible";
      const mealid = e.target.getAttribute("data-id");
      getMealDetails(mealid);
    });
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
