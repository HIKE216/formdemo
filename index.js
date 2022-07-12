
var image=[];
let products=[
    {
        name:"SLnecklaces",
        tag:1,
        price:2500,
        inCart:0,
        img:"Pictures/Bracelets/1.jpg"
    },
    {
        name:"starSL-necklaces",
        tag:2,
        price:2500,
        inCart:0,
        img:"Pictures/Bracelets/2.jpg"
    },
    {
        name:"normal",
        tag:3,
        price:2500,
        inCart:0,
        img:"Pictures/Bracelets/3.jpg"
    }
]
let carts=document.querySelectorAll(".add-cart");
for(let i=0;i<carts.length;i++){
     carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
        start(products[i]);
     })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
function cartNumbers(products){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;}
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
    setItems(products)
}
function setItems(products){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    if(cartItems !=null){
        if(cartItems[products.name]==undefined){
            cartItems={
                ...cartItems,
                [products.name]:products
            }
        }
        cartItems[products.name].inCart+=1
    }else {
    products.inCart=1;
    cartItems={
        [products.name]:products
    }}
    localStorage.setItem("productsInCart",JSON.stringify(cartItems))
}
function totalCost(products){
    let cartCost=localStorage.getItem('totalCost')
    
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost+products.price)
    }else{
    localStorage.setItem('totalCost',products.price)
}}
function displayCart(){
let cartItems=localStorage.getItem('productsInCart')
cartItems=JSON.parse(cartItems);
let productContainer=document.querySelector('.produce');
let cartCost=localStorage.getItem('totalCost')

if(cartItems&&productContainer){
    productContainer.innerHTML='';
    Object.values(cartItems).map(item=>{
        productContainer.innerHTML +=`
        <div id="${item.tag}" class= "things">
        <div class="products">
        <button class="food" onclick="window.clear('${item.name}')"><ion-icon name="close-circle"></ion-icon></button>
        <img src="/Pictures/Bracelets/${item.tag}.jpg">
        <span>${item.name}</span></div>
        <div class="price">${item.price}</div>
        <div class="quantity">
        <ion-icon name="arrow-down-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="arrow-up-circle"></ion-icon>
        </div>
        <div class="total">
        #${item.inCart * item.price}.00
        </div>
        <a href="form.html">Order</a> 
        </div>
        `;
    });
    productContainer.innerHTML +=`
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket Total
    </h4>
    <h4 class="basketTotal">
    #${cartCost}.00
    </h4>
    </div>
    `
}
}
function clear(num){
    let box=localStorage.getItem('productsInCart')
    console.log(box)
    box=JSON.parse(box);
    let newCartNumber=localStorage.getItem('cartNumbers');
    newCartNumber=parseInt(newCartNumber);
    let number=box[num].inCart;
    newCartNumber-=number;
    localStorage.setItem('cartNumbers',newCartNumber);
    document.querySelector('.cart span').textContent=newCartNumber;
    let b=box[num].tag;
    b=b.toString();
    console.log(b)
    let a=document.getElementById(b);
    console.log(a)
    a.remove();
    let newTotal=localStorage.getItem('totalCost');
    newTotal=parseInt(newTotal);
    let tot=box[num].price;
    newTotal-= tot;
    localStorage.setItem('totalCost',newTotal);
    document.querySelector('.basketTotal').textContent=newTotal+".00"
    delete box[num];
    localStorage.removeItem('productsInCart');
    localStorage.setItem("productsInCart",JSON.stringify(box));
    
    
}
function start(products){

    let cartItems=localStorage.getItem('Images');
    cartItems=JSON.parse(cartItems);

    if(cartItems !=null){
        if(cartItems[products.name]==undefined){
            cartItems=[
                ...cartItems,
             products.img
            ]
        }
    }else {
    cartItems=[
        products.img
    ]}
    localStorage.setItem("Images",JSON.stringify(cartItems))
}

    
function form(){
    let beast=localStorage.getItem('Images');
    beast=JSON.parse(beast);
    console.log(beast)
    let order=document.querySelector('.ordered');
    console.log(order)
    for(let i=0;i<beast.length;i++){
  
    order.value='<img src="'+beast[i]+'">'}
    console.log(order.value)
}
onLoadCartNumbers()
displayCart()
form()