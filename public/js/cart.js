//GLOBAL
var products= JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var table= document.getElementById('table');
var totalOrder= document.getElementById('totalOrder');
var shopping= document.getElementById('products');
var price=0;
var name;

//CLEAN
function clean() {
    localStorage.clear();
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+= `
        <tr>
            <th scope="row" class="border-0">
                <div class="p-2">
                    <img src="${products[index].path}" alt="" width="70" class="img-fluid rounded shadow-sm">
                    <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${products[index].name}</a></h5>
                    </div>
                </div>
            </th>
                <td class="border-0 align-middle"><strong>$${products[index].price}.00</strong></td>
        </tr>`
        price=price+parseInt(products[index].price);
    }
    price=0;
    table.innerHTML=`
        <tr>
            <th></th>
        </tr>
    `;
    document.getElementById("btnClean").style.display="none";
} 

(()=>{
    for (let index = 0; index <products.length; index++) {
       table.innerHTML+=`
       <tr>
           <th scope="row" class="border-0">
               <div class="p-2">
                   <img src="${products[index].path}" alt="" width="70" class="img-fluid rounded shadow-sm">
                   <div class="ml-3 d-inline-block align-middle">
                       <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${products[index].name}</a></h5>
                   </div>
               </div>
           </th>
               <td class="border-0 align-middle"><strong>$${products[index].price}.00</strong></td>
       </tr>`
       test(products[index]);
       price = price+parseInt(products[index].price);
       montoParse = parseFloat(price);
       if (typeof montoParse === 'number' && !isNaN(montoParse)) {
        var impuesto   = montoParse * 0.07;
        var total = montoParse + impuesto;
       }
    }
    totalOrder.innerHTML+=`
              <ul class="list-unstyled mb-4">
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Pedido Subtotal </strong><strong>$${price}.00</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Envio</strong><strong>$0.00</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Impuestos</strong><strong>$${impuesto.toFixed(2)}</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                <h5 class="font-weight-bold">$${total.toFixed(2)}</h5>
              </li>
            </ul>
            <form id="form1" action="/cart" method="POST" autocomplete="off">
                <input type="hidden" name="total" value="${total.toFixed(2)}">
                <button id="submitbtn" class="btn btn-dark rounded-pill py-2 btn-block">Proceder pago</button>
            </form>
    `;
    products=JSON.parse(localStorage.getItem('cart'));
})();
var form= document.getElementById('form1');
document.getElementById('submitbtn').addEventListener('click',()=>{
    localStorage.clear();
    setTimeout(()=>{
        sub();
    },5000);
});
function sub() {
        setTimeout(()=>{
            form.submit();
        },5000);
}

function test(products) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', "http://localhost:3000/addToCart", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(products));
}