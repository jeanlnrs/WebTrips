// GLOBAL
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');
// DIVS
var fruitDIV = document.getElementById("fruitDIV");
var juiceDIV = document.getElementById("juiceDIV");
var saladDIV = document.getElementById("saladDIV");
//INFORMATION
var FRUIT = [
    { name: 'Bocas del toro', price: 300,img:'../img/fruits/fruit1.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Esclusas de Miraflores', price: 75,img:'../img/fruits/fruit2.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Casco Viejo', price: 40,img:'../img/fruits/fruit3.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Portobelo', price: 50,img:'../img/fruits/fruit4.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Panamá Vieja', price: 30,img:'../img/fruits/fruit5.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Calzada de Amador', price: 30,img:'../img/fruits/fruit6.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'}
];
var JUICE = [
    { name: 'Salar de Pedernales, Chile', price: 2500,img:'../img/juice/juice1.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Cusi Cusi, Argentina', price: 3000,img:'../img/juice/juice2.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Bosque Seco de Mangahurco, Ecuador', price: 1350,img:'../img/juice/juice3.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'}];
var SALAD = [
    { name: 'Coliseo Romano, Roma', price: 5000,img:'../img/salads/salad1.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'La Torre Eiffel, Paris', price: 7500,img:'../img/salads/salad2.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'},
    { name: 'Basílica de Santa Sofía, Estambul', price: 5600,img:'../img/salads/salad3.jpeg',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'}
];
//HTML
function HTMLfruitProduct(con) {
    let URL = `../img/fruits/fruit${con}.jpeg`;
    let btn = `btnFruit${con}`;
    return `
            <div class="col-md-4">
            <!-- Card Wider -->
            <div class="card mb-4 shadow-sm">

                <!-- Card image -->
                <div class="view overlay">
                    <img class="card-img-top" style="height:16rem;" src="${FRUIT[con - 1].img}" alt="Card image cap">
                </div>
                <!-- Card content -->
                <div class="card-body">

                    <!-- Title -->
                    <h5 class="card-title">${FRUIT[con - 1].name}</h5>
                    <hr>

                    <!-- Text -->
                    <p class="card-text">${FRUIT[con - 1].description}</p>
                    <div class="d-flex justify-content-between align-items-center">

                        <!-- Link -->

                        <button type="button"
                            onclick="cart2('${FRUIT[con - 1].name}','${FRUIT[con - 1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-flat btn-lg"><a class="black-text d-flex justify-content-end" " href="/cart"><b>$${FRUIT[con - 1].price}</b></a></button>
                        <button id="${btn}" type="button"
                            onclick="cart('${FRUIT[con - 1].name}','${FRUIT[con - 1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-flat btn-lg justify-content-end"><i class="fas fa-shopping-cart pl-1"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Card Light -->
        `
}
function HTMLjuiceProduct(con) {
    let URL = `img/juice/juice${con}.jpeg`;
    let btn = `btnJuice${con}`;
    return `
            <div class="col-md-4">
            <!-- Card Wider -->
            <div class="card mb-4 shadow-sm">

                <!-- Card image -->
                <div class="view overlay">
                    <img class="card-img-top" style="height:16rem;" src="${JUICE[con - 1].img}" alt="Card image cap">
                </div>
                <!-- Card content -->
                <div class="card-body">

                    <!-- Title -->
                    <h5 class="card-title">${JUICE[con - 1].name}</h5>
                    <hr>

                    <!-- Text -->
                    <p class="card-text">${JUICE[con - 1].description}</p>
                    <div class="d-flex justify-content-between align-items-center">

                        <!-- Link -->

                        <button type="button"
                            onclick="cart2('${JUICE[con - 1].name}','${JUICE[con - 1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-flat btn-lg"><a class="black-text d-flex justify-content-end" " href="/cart"><b>$${JUICE[con - 1].price}</b></a></button>
                        <button id="${btn}" type="button"
                            onclick="cart('${JUICE[con - 1].name}','${JUICE[con - 1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-flat btn-lg justify-content-end"><i class="fas fa-shopping-cart pl-1"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Card Light -->
        `
}
function HTMLsaladProduct(con) {
    let URL = `img/salads/salad${con}.jpeg`;
    let btn = `btnSalad${con}`;
    return `
            <div class="col-md-4">
            <!-- Card Wider -->
            <div class="card mb-4 shadow-sm">

                <!-- Card image -->
                <div class="view overlay">
                    <img class="card-img-top" style="height:16rem;" src="${SALAD[con - 1].img}" alt="Card image cap">
                </div>
                <!-- Card content -->
                <div class="card-body">

                    <!-- Title -->
                    <h5 class="card-title">${SALAD[con - 1].name}</h5>
                    <hr>

                    <!-- Text -->
                    <p class="card-text">${SALAD[con - 1].description}</p>
                    <div class="d-flex justify-content-between align-items-center">

                        <!-- Link -->

                        <button type="button"
                            onclick="cart2('${SALAD[con - 1].name}','${SALAD[con - 1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-flat btn-lg"><a class="black-text d-flex justify-content-end" " href="/cart"><b>$${SALAD[con - 1].price}</b></a></button>
                        <button id="${btn}" type="button"
                            onclick="cart('${SALAD[con - 1].name}','${SALAD[con - 1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-flat btn-lg justify-content-end"><i class="fas fa-shopping-cart pl-1"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Card Light -->
        `
}
//ANIMATION 
function animation() {
    const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
    });
    toast({
        type: 'success',
        title: 'Agregado al carrito de compras'
    });
}
// CART FUNCTIONS
function cart(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url,
        cant: 1
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `${products.length}`;
    document.getElementById(btncart).style.display = "none";
    animation();
}
function cart2(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url,
        cant: 1
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `${products.length}`;
    document.getElementById(btncart).style.display = "none";
}


(() => {
    for (let index = 1; index <= 6; index++) {
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
    }
    for (let index = 1; index <= 3; index++) {
        juiceDIV.innerHTML += `${HTMLjuiceProduct(index)}`;
        saladDIV.innerHTML += `${HTMLsaladProduct(index)}`;
    }
    if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `${products.length}`;
    }
})();