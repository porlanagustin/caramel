//PRODUCTOS//

class Product{
    constructor(id, image, name, price, stock){
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

const product1 = new Product(1, "assets/chiclesgigantes.jpg", "Chicles Gigantes", 300, 100);
const product2 = new Product(2, "assets/minichicles.jpg", "Mini Chicles", 250, 100);
const product3 = new Product(3, "assets/besofresa.jpg","Beso Fresa", 300, 100);
const product4 = new Product(4, "assets/gusanitos.jpg","Gusanitos Semi Acidos", 250, 100);
const product5 = new Product(5, "assets/skittles.jpg","Skittles", 400, 100);
const product6 = new Product(6, "assets/acidcaramel.jpg","Caramelo Acido", 70, 100);
const product7 = new Product(7, "assets/sugus.jpg","Sugus", 150, 100);
const product8 = new Product(8, "assets/flynnpaff.png","Flyn Paff", 100, 100);

const products = [];

products.push(product1);
products.push(product2);
products.push(product3);
products.push(product4);
products.push(product5);
products.push(product6);
products.push(product7);
products.push(product8);

function showProducts(products) {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = ""

    products.forEach(product => {
        const divProduct = document.createElement('div');
        divProduct.classList.add("col");
        divProduct.classList.add("mb-5");
        divProduct.innerHTML = `
        <div class="card h-100">
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
            <img class="card-img-top" src="${product.image}" alt="${product.name}" />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder" id="name">${product.name}</h5>
                    <span class="price">${product.price}</span>
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <button id"countItems" class="btn btn-outline-dark mt-auto" onclick="addClicks()">Add to cart</button>
            </div>
        </div>`;
        containerProducts.appendChild(divProduct);                
    })
}

showProducts(products);

//Trabajando con Api//

let productsApi;

const apiUrl = 'https://api.mercadolibre.com/';
const endpointProducts = 'sites/MLA/search';

const getOfDatabase = () => {
    fetch(apiUrl+endpointProducts+'?nickname=SWEET+MARKET')
    .then((response) => response.json())
    .then((data) => {
        productsApi = data.results;
        addCartFetch(productsApi); 
    })
}

getOfDatabase()

const addCartFetch = (arrayProducts) => {
    let cardsFetch = ``;
    arrayProducts.forEach((prodFetch) => {
        cardsFetch += `<div class="col mb-5">
        <div class="card h-100">
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
            <img class="card-img-top" src="${prodFetch.thumbnail}" alt="${prodFetch.name}" />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder" id="name">${prodFetch.title}</h5>
                    <span class="${prodFetch.price}">${prodFetch.price}</span>
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
            </div>
        </div>
    </div>`
    });

    document.getElementById("fetch").innerHTML = cardsFetch;
}

//AGREGAR AL CARRITO//

const btnCart = document.querySelectorAll(".btn");
btnCart.forEach((listenBtn) => {
    listenBtn.addEventListener('click', addToCartClicked);
    
});

const cartItemsContainer = document.querySelector('.cartItemsContainer');

function addToCartClicked(event){
    const button = event.target;
    const card = button.closest('.card');
    
    const cardTitle = card.querySelector('.fw-bolder').textContent;
    const cardPrice = card.querySelector('.price').textContent;
    const cardImage = card.querySelector('.card-img-top').src;
    

    addItemToCart(cardTitle, cardPrice, cardImage);
    addToLocal(cardTitle, cardPrice, cardImage);
    
}

function addItemToCart(cardTitle, cardPrice, cardImage){

    const rowCart = document.createElement('div');
    const contentCart = `
        <div class="row bg-light cartItem border-bottom border-secondary">
            <div class="col d-flex justify-content-center align-items-center"><img src=${cardImage} class="imgSize border border-warning"><h2 class="itemTitle">${cardTitle}</h2></div>
            <div class="col d-flex justify-content-center align-items-center"><span class="price">${cardPrice}</span></div>
            <div class="col d-flex justify-content-center align-items-center"><input class="inputSize" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
        </div>`

    rowCart.innerHTML = contentCart;
    cartItemsContainer.append(rowCart);

    rowCart.querySelector('.btn-danger').addEventListener('click', removeItem);
    rowCart.querySelector('.inputSize').addEventListener('change', quantityChange);


    updatePrice();
}

function updatePrice(){
    let total = 0;
    const totalPrice = document.querySelector(".totalPrice");
    const cartItems = document.querySelectorAll(".cartItem");

    cartItems.forEach(cartItems => {
        const cartItemPriceElement = cartItems.querySelector(".price");
        const cartItemPrice = Number(cartItemPriceElement.textContent.replace('$',''));
        const cartQuantityElement = cartItems.querySelector(".inputSize");
        const cartQuantity = Number(cartQuantityElement.value);
        
        total = total + cartItemPrice * cartQuantity;
    });

    totalPrice.innerHTML = `Total: $${total}`;
}

function removeItem(event) {
    const btnClick = event.target;
    btnClick.closest('.cartItem').remove();
}

function quantityChange(event){
    const changeQuant = event.target;
    changeQuant.value <= 1 ? changeQuant.value = 1 : null;
    updatePrice();
} 

//CANTIDAD EN CARRITO//

let countItem = 0;

function addClicks(){
    Toastify({
        text: "Agregaste el carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast(); 

      countItems();
      
}

function countItems(){
    countItem++;
    document.getElementById("count").innerText = countItem;
}

console.log(countItem);

console.log(countItems);
//MOSTRAR CARRITO//

function showCart(){
    const clickCart = document.querySelector(".none");
    clickCart.classList.add("visible");   
}

//LOCAL STORAGE//

const cartLocal = localStorage.getItem('cart') != undefined ? JSON.parse(localStorage.getItem('cart')) : [];

function addToLocal(cardTitle, cardPrice, cardImage){

    const object = {
        cardTitle: cardTitle,
        cardPrice: cardPrice,
        cardImage: cardImage
    }

    cartLocal.push(object);
    const cartJSON = JSON.stringify(cartLocal);
    localStorage.setItem('cart', cartJSON);
}

if(localStorage.getItem('cart') != undefined || localStorage.getItem('cart') != []){
    const containerLocal = document.createElement('div');
    
    cartLocal.forEach((object) =>{
        const contentLocal = `
        <div class="row bg-light cartItem border-bottom border-secondary">
            <div class="col d-flex justify-content-center align-items-center"><img src=${object.cardImage} class="imgSize border border-warning"><h2 class="itemTitle">${object.cardTitle}</h2></div>
            <div class="col d-flex justify-content-center align-items-center"><span class="price">${object.cardPrice}</span></div>
            <div class="col d-flex justify-content-center align-items-center"><input class="inputSize" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
        </div>`
    
        containerLocal.innerHTML += contentLocal;
        cartItemsContainer.append(containerLocal);
    })
}

function specialOffer(){
    swal({
        title: "En estos momentos no hay ofertas!",
        text: "Lo lamentamos",
        icon: "error",
        button: "Seguir Buscando!",
      });
}


