//spinner load function
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};

//all data load
const dataLoad = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.plants);
    });

  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => categoryDisplay(data.categories));
};

//detail Show btn
const showDetailsBtn = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => showDetails(data.plants));
};

// details show
const showDetails = (plants) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="flex flex-col justify-between">
    <h1 class="text-2xl font-semibold mb-4">${plants.name}</h1>
    <div class="h-[300px] w-[300px] mb-4"><img src="${plants.image}" alt="image" class="w-full h-full object-cover"></div>
    <div class="my-4">
        <p><span class="text-2xl font-semibold my-2">Category: </span><span class="text-[#1f2937] opacity-80"> ${plants.category}</span> </p>
        <p><span class="text-2xl font-semibold my-2">Price: </span><span class="text-[#1f2937] opacity-80">&#2547 ${plants.price}</span> </p>
        <p><span class="text-2xl font-semibold">Description: </span><span class="text-[#1f2937] opacity-80"> ${plants.description}</span> </p>
    </div>
</div>
    `;

  detailsContainer.append(div);
  my_modal_4.showModal();
};

// data display
const displayData = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div  id="card" class="p-4 flex flex-col  rounded-lg gap-2 bg-white shadow-md hover:shadow-xl h-[600px]">
                    <div class="h-1/2 w-full rounded-lg"><img src="${plant.image}" alt="" class="rounded-lg h-full w-full object-cover" /></div>
                    <div class="h-1/2 flex flex-col justify-between">
                        <div class="my-3">
                        <h2 onclick="showDetailsBtn(${plant.id})" id="title" class="text-[0.875rem] font-semibold">${plant.name}</h2>
                        <p id="description" class="text-[0.75rem] text-[#1f2937] opacity-80">${plant.description}</p>
                    </div>
                    <div class="flex justify-between items-center my-3">
                        <span id="type" class="px-2 py-1 rounded-2xl bg-[#dcfce7] text-[#15803d]">${plant.category}</span>

                        <p class="text-[#1f2937]  mt-2 text-[0.875rem] font-semibold">&#2547<span id="price">${plant.price}</span> </p>
                    </div>
                    </div>
                     <button class="add-to-cart-btn bg-[#15803d]   text-white p-4 rounded-4xl">Add to Cart</button>
                </div>
    `;

    cardContainer.append(div);
  });
  manageSpinner(false);

  // add to cart
  const btns = document.querySelectorAll(".add-to-cart-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const title =
        btn.parentNode.children[1].children[0].children[0].innerText;
      const price = Number(
        btn.parentNode.children[1].children[1].children[1].children[0].innerText
      );
      alert(`${title} has been added to the cart.`);
      displayCart(title, price);
    });
  });
};

const displayCart = (title, price) => {
  const cartContainer = document.getElementById("cart-container");
  const div = document.createElement("div");
  div.className =
    "bg-[#f0fdf4] rounded-lg flex justify-between items-center py-2 px-3";
  div.innerHTML = `
                        <div>
                            <p class="text-[0.875rem] font-semibold">${title}</p>
                            <p class="text-[#1f2937] opacity-50 mt-2">&#2547<span>${price}</span></p>
                        </div>
                        <span   class="deleteBtn text-[#1f2937] opacity-50">
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                        
                    
    `;
  cartContainer.append(div);
  //update cart
  const totalPrice = document.getElementById("total-price");
  let totalAmount = Number(totalPrice.innerText);
  totalPrice.innerText = totalAmount + price;

  //delete cart
  const deleteBtn = div.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    totalAmount = Number(totalPrice.innerText);
    totalPrice.innerText = totalAmount - price;
    div.remove();
  });
};

//category button toggle
const toggleCategory = (id) => {
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((categoryCard) => {
    categoryCard.classList.remove("active");
  });
  const categoryCard = document.getElementById(`category-card-${id}`);
  categoryCard.classList.add("active");
};

//display category base plant
const displayCategoryPlant = (id) => {
  if (Number(id) === 0) {
    toggleCategory(id);
    dataLoad();
    return;
  }
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayData(data.plants);
      toggleCategory(id);
    });
};

// category show
const categoryDisplay = (categories) => {
  const categoryContainer = document.getElementById("categories-container");
  categoryContainer.innerHTML = `<div id="category-card-0" onclick="displayCategoryPlant(${0})" class="category-card px-3 py-2 hover:bg-[#15803d] active hover:text-white">All category</div>`;
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div id="category-card-${category.id}" onclick="displayCategoryPlant('${category.id}')" class="category-card px-3 py-2 hover:bg-[#15803d] hover:text-white">${category.category_name}</div>
        `;
    categoryContainer.append(div);
    manageSpinner(false);
  });
};



dataLoad();
