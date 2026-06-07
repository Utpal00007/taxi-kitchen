const loadCategory = () => {
  const uri = "https://taxi-kitchen-api.vercel.app/api/v1/categories";

  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadFoods = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;

  const catBtns = document.querySelectorAll(".btn-category");
  catBtns.forEach((btn) => btn.classList.remove("active"));

  const currentBtn = document.getElementById(`cat-btn-${id}`);
  currentBtn.classList.add("active");

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
};

const loadFoodDetails = (id) => {
  const uri = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayDetails(data.details));
};

const displayCategory = (categories) => {
  //   console.log(categories);
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = "";
  for (let cat of categories) {
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
         <button id="cat-btn-${cat.id}" onclick="loadFoods(${cat.id})" class="btn bg-white btn-block justify-start shadow btn-category rounded">
            <img
              src="${cat.categoryImg}"
              alt=""
              class=" w-10 h-10 object-contain "
            /> ${cat.categoryName}
          </button>`;

    catContainer.append(categoryCard);
  }
};

const displayDetails = (food) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
     <div class="">
        <h2 class="text-3xl font-bold">${food.title}</h2>
        
      </div>  
  
     <div class="">
        <img src="${food.foodImg}" alt="">
      </div>
  
 
      <div class="flex gap-2 my-4 items-center"> <div class="badge badge-primary bg-sky-400 rounded-sm p-2">
        ${food.area}
      </div>
      
    <a href="${food.video}" target="_blank" class="btn btn-primary p-2 rounded-sm bg-yellow-500">Watch Now</a></div>
     
 `;
  document.getElementById("my_modal_3").showModal();
};

const displayFoods = (foods) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  foods.forEach((food) => {
    const foodCard = document.createElement("div");
    foodCard.innerHTML = `
     <div onclick="loadFoodDetails(${food.id})"
          class="p-5 bg-white flex flex-col md:flex-row gap-3 shadow rounded-xl"
        >
          <div class="img flex-1">
            <img
              src="${food.foodImg}"
              alt=""
              class="w-full md:w-[160px] rounded-xl h-[220px] md:h-[160px] object-cover"
            />
          </div>

          <div class="flex-1">
            <h1 class="text-xl font-bold">
              ${food.title}
            </h1>

            <div class="badge badge-warning">
              ${food.category}
            </div>

            <div class="divider divider-end">
              <h2 class="text-yellow-600 font-semibold">
                $
                <span class="price">${food.price}</span>
                BDT
              </h2>
            </div>

            <button
              class="btn btn-warning w-full md:w-auto"
            >
              <i class="fa-solid fa-square-plus"></i>
              Add This Item
            </button>
          </div>
        </div>`;

    foodContainer.append(foodCard);
  });
};

loadCategory();
