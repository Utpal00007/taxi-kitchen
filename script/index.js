const loadCategory = () => {
  const uri = " https://taxi-kitchen-api.vercel.app/api/v1/categories";

  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const displayCategory = (categories) => {
  //   console.log(categories);
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = "";
  for (let cat of categories) {
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
         <button class="btn btn-block justify-start shadow btn-category">
            <img
              src="${cat.categoryImg}"
              alt=""
              class="w-10"
            /> ${cat.categoryName}
          </button>`;

    catContainer.append(categoryCard);
  }
};

loadCategory();
