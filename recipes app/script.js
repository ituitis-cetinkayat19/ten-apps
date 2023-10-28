const leftScroll = document.querySelector("i.fa-caret-left");
const rightScroll = document.querySelector("i.fa-caret-right");
const favMeals = document.querySelector(".fav-meals");
const favBtn = document.querySelector(".fav-btn");
const favBtnIcon = document.querySelector(".fav-btn i");
const randomRecipe = document.querySelector("span.random");
const mealImage = document.querySelector(".meal-header img");
const mealName = document.querySelector(".meal-body h4");
const mealInfo = document.querySelector(".meal-info");

function like() {
    favBtnIcon.classList.remove("fa-regular");
    favBtnIcon.classList.add("fa-solid");
    favBtnIcon.style.color = "red";
}

function dislike() {
    favBtnIcon.classList.add("fa-regular");
    favBtnIcon.classList.remove("fa-solid");
    favBtnIcon.style.color = "black";
}

favMeals.addEventListener("click", e => {
    if(e.target.matches("img")) {
        const mySpan = e.target.nextSibling;
        mealImage.src = e.target.src;
        mealName.textContent = mySpan.textContent;
        like();
    }
});

favBtn.addEventListener("click", () => {
    if(favBtnIcon.classList.contains("fa-regular")) {
        like();
        const newChild = document.createElement("li");
        newChild.innerHTML = `<img src='${mealImage.src}' alt=''><div>${mealName.textContent}</div>`;
        favMeals.appendChild(newChild);
    } else {
        dislike();
        const favMealsList = favMeals.querySelectorAll("li");
        for(let i = 0; i < favMealsList.length; i++) {
            if(favMealsList[i].firstChild.src == mealImage.src) {
                favMealsList[i].remove();
                return;
            }
        }
    }
});

leftScroll.addEventListener("click", () => {favMeals.scrollLeft -= 60;});

rightScroll.addEventListener("click", () => {favMeals.scrollLeft += 60;});

randomRecipe.addEventListener("click", getRandomMeal);

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json());
    const randomMeal = resp.meals[0];
    mealImage.src = randomMeal.strMealThumb;
    mealName.textContent = randomMeal.strMeal;
    const instructions = randomMeal.strInstructions.split(". ");
    instructions.forEach(inst => {
        mealInfo.innerHTML += `<li>${inst}</li>`;
    });
    const favMealsList = favMeals.querySelectorAll("li");
    if(favMealsList) {
        for(let i = 0; i < favMealsList.length; i++) {
            if(favMealsList[i].firstChild.src == mealImage.src) {
                like();
                return;
            }
        }
    }
    dislike();
}

getRandomMeal();