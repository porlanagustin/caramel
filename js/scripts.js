//PRODUCTS//

class Product{
    constructor(id, name, price, stock){
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

const product1 = new Product(1, "Chicles Gigantes", 300, 100);
const product2 = new Product(2, "Mini Chicles", 250, 100);
const product3 = new Product(3, "Beso Fresa", 300, 100);
const product4 = new Product(4, "Gusanitos Semi Acidos", 250, 100);
const product5 = new Product(5, "Skittles", 400, 100);
const product6 = new Product(6, "Caramelo Acido", 70, 100);
const product7 = new Product(7, "Sugus", 150, 100);
const product8 = new Product(8, "Flyn Paff", 100, 100);
const cart = [];
const productsCart = [];

const products = [product1, product2, product3, product4, product5, product6, product7, product8];

//AGREGAR NUMERO AL CARRITO//

let countItems = 0;

function addNumberToCart(){
    countItems ++;
    document.getElementById("countItems").innerText = countItems.toString();
}

//AGREGAR AL CARRITO + compra //

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

