const loadCategory = () => {
  const uri = "https://taxi-kitchen-api.vercel.app/api/v1/categories";

  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadFoods = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
  document.getElementById("food-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");

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

let cart = [];
let totalPrice = 0;

const displayCategory = (categories) => {
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = "";
  for (let cat of categories) {
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
         <button id="cat-btn-${cat.id}" onclick="loadFoods(${cat.id})" class="btn bg-white btn-block justify-start shadow btn-category rounded">
            <img
              src="${cat.categoryImg}"
              alt=""
              class="w-10 h-10 object-contain rounded-full"
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
     <div 
          class="p-5 bg-white flex flex-col md:flex-row gap-3 shadow rounded-xl"
        >
          <div class="img flex-1">
            <img
              src="${food.foodImg}"
              alt=""
              onclick="loadFoodDetails(${food.id})"
              class="w-full md:w-[160px] rounded-xl h-[220px] md:h-[160px] object-cover food-img"
            />
          </div>

          <div class="flex-1">
            <h1 class="text-xl font-bold food-title">
              ${food.title}
            </h1>

            <div class="badge badge-warning">
              ${food.category}
            </div>

            <div class="divider divider-end">
              <h2 class="text-yellow-600 font-semibold">
                $
                <span class="food-price">${food.price}</span>
                BDT
              </h2>
            </div>

            <button
              onclick="addToCart(this)" class="btn btn-warning w-full md:w-auto "
            >
              <i class="fa-solid fa-square-plus"></i>
              Add This Item
            </button>
          </div>
        </div>`;

    foodContainer.append(foodCard);
  });
  document.getElementById("food-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
};

loadCategory();

const addToCart = (btn) => {
  const card = btn.parentNode.parentNode;
  const foodTitle = card.querySelector(".food-title").innerText;
  const foodImg = card.querySelector(".food-img").src;
  const foodPrice = card.querySelector(".food-price").innerText;
  const foodPriceNum = Number(foodPrice);
  console.log(foodTitle, foodImg, foodPrice);
  const selectedItem = {
    foodTitle: foodTitle,
    foodImg: foodImg,
    foodPriceNum: foodPriceNum,
  };
  cart.push(selectedItem);
  totalPrice += foodPriceNum;
  displayCart(cart);
  displayTotal(totalPrice);
};

const displayTotal = (val) => {
  document.getElementById("total-price").innerText = val;
};

const displayCart = (cart) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
     <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>

            <div class="flex-1">
              <h1 class="text-xs font-bold">
                Roast fennel and aubergine paella
              </h1>

              <div>
                <h2 class="text-yellow-600 font-semibold">
                  <span class="price">${item.foodPriceNum}</span>
                  BDT
                </h2>
              </div>
            </div>

            <div
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>`;

    cartContainer.append(newItem);
  });
};
