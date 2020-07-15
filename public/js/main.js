// GLOBAL
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');
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
function cart(name, description, price, path, ) {
    var item = {
        name: name,
        description : description,
        price: price,
        path: path
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
    document.getElementById(name).style.display = "none";
    animation();
}
function cart2(name, description, price, path, ) {
    var item = {
        name: name,
        description : description,
        price: price,
        path: path
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
    document.getElementById(name).style.display = "none";
}