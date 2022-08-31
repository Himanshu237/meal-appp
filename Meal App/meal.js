const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementsByClassName(
    "result-heading"
    );
const single_mealEl = document.getElementById(
    "single-meal"
    );

// now hame event listners ko generate karna hai 
// now hamne jo jo variablee generate kia hai unhe hame add event listner ko dena padega
// so 1 st event listner hoga submit button ke liye
// jese hum submit button pr click kr rhe hain toh hame chiye kya exactly hame result chiye 
// toh hum abhi submit ke liye ek onclick listnr lenge
function searchMeal(e){
    e.preventDefault();  // ye kya krega ki jese hi aap submit button pe click kroge toh jo bhi
                        // hamara searching bar hoga jiske andar hmne type kia hoga vo bilkul clear ho jayega
    single_mealEl.innerHTML="";
    // get search meal
   // toh ab hamarei jo search hai uske andr ek value ayegi 
   // jab hum type karenge  
 const term = search.value;
 // check for empty // jab koi value nhi put ki bs search button pe click kr diya
if(term.trim()){
     fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
     )
     .then((res) => res.json())
     .then((data) => {
        console.log(data);
        resultHeading.innerHTML= `<h2>Search Result for ${term}`;
        if(data.meals === null)
        {
            resultHeading.innerHTML=`<h2>There Are No Result For ${term}`;

        }else{
            mealEl.innerHTML = data.meals.map(
                (meal) =>`
                <div class="meal">
                <img src="${meal.strMealThumb}"alt="${meal.strMeal}">
                <div class="meal-info" data-mealID=${meal.idMeal}>
                <h3>${meal.strMeal}</h3>
                </div>
                `
            )
            .join("");
        }
     });
    }else{
        alert("please insert a value in Search");
    }
}
// fetch meal by id
function getMealById(mealID)
{
    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
        
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // localStorage.setItem("meadlData", data.meals(0))
            //location
            //ls.getItem()
           const meal = data.meals[0];
           addMealToDOM(meal);
        });
}

// add meal to dom
function addMealToDOM(meal){
    const ingredients = [];
    for(let i = 1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`
            ${meal[`strIngredient${i}`]} - ${
                meal[`strMeasure${i}`]
            }`
            );
        }else{
            break;
        }
    }
    single_mealEl.innerHTML = `
    <div class= "single-meal">
    <h1> ${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` :''}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    <div>
    `;
    
}


submit.addEventListener("submit",searchMeal);
// ab ye search meal option hamara exactly jo by default yaha show hone walab hai us parameter ko lene wala hai 
mealEl.addEventListener('click',(e)=>{
    const mealInfo = e.path.find((item)=>{
        if(item.classList){
            return item.classList.contains("meal-info");
        }else{
            return false;
        }
    });
    if(mealInfo){
        const mealID=mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});