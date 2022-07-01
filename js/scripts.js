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
            <div class="col d-flex justify-content-center align-items-center"><img src=${cardImage} class="imgSize border border-warning"></div>
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
