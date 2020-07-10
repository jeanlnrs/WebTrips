//GLOBAL
var products= JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var cart_n = document.getElementById('cart_n');
var table= document.getElementById('table');
var totalOrder= document.getElementById('totalOrder');
var price=0;
var name;
//HTML
function tableHTML(i) {
    return `
    <tr>
        <th scope="row" class="border-0">
            <div class="p-2">
                <img src="${products[i].url}" alt="" width="70" class="img-fluid rounded shadow-sm">
                <div class="ml-3 d-inline-block align-middle">
                    <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${products[i].name}</a></h5>
                </div>
            </div>
        </th>
            <td class="border-0 align-middle"><strong>$${products[i].price}.00</strong></td>
    </tr>
    `;
}
//CLEAN
function clean() {
    localStorage.clear();
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+= tableHTML(index);
        total=total+parseInt(products[index].price);
    }
    total=0;
    table.innerHTML=`
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    `;
    cart_n.innerHTML='';
    document.getElementById("btnBuy").style.display="none";
    document.getElementById("btnClean").style.display="none";
}

(()=>{
    for (let index = 0; index <products.length; index++) {
       table.innerHTML+=tableHTML(index);
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
                <input type="hidden" name="_id" value="">
                <button id="submitbtn" class="btn btn-dark rounded-pill py-2 btn-block">Proceder pago</button>
            </form>
    `;
    products=JSON.parse(localStorage.getItem('cart'));
    cart_n.innerHTML=`${products.length}`;
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
