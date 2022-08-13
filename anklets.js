let products=[
    {
        tag:2001,
        price:3500,
        inCart:0,
    },
    {
        tag:2002,
        price:3500,
        inCart:0,
    },
    {
        
        tag:2003,
        price:3500,
        inCart:0,
    },
    {
        
        tag:2004,
        price:3500,
        inCart:0,
    },{
        
        tag:2005,
        price:3500,
        inCart:0,
    },{
        
        tag:2006,
        price:3500,
        inCart:0,
    },{
        
        tag:2007,
        price:3500,
        inCart:0,
    },{
        
        tag:2008,
        price:3500,
        inCart:0,
    },{
        
        tag:2009,
        price:3500,
        inCart:0,
    },{
        
        tag:2010,
        price:3500,
        inCart:0,
    },{
        
        tag:2011,
        price:3500,
        inCart:0,
    },{
        
        tag:2012,
        price:3500,
        inCart:0,
    },{
        
        tag:2013,
        price:3500,
        inCart:0,
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
        if(cartItems[products.tag]==undefined){
            cartItems={
                ...cartItems,
                [products.tag]:products
            }
        }
        cartItems[products.tag].inCart+=1
    }else {
    products.inCart=1;
    cartItems={
        [products.tag]:products
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
    Object.values(cartItems).map(item=>{
        productContainer.innerHTML +=`
        <div id="${item.tag}" class= "things">
        <div class="products">
        <button class="food" onclick="window.clear('${item.tag}')"><ion-icon name="close-circle"></ion-icon></button>
        <img src="./${item.tag}.jpg">
        <div class="price">${item.price}</div>
        <div class="quantity">
        <ion-icon name="arrow-down-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="arrow-up-circle"></ion-icon>
        </div>
        <div class="total">
        #${item.inCart * item.price}.00
        </div> 
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
    <div><a href="form.html" onclick="form()">Order</a></div>
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
    let tot=box[num].price*box[num].inCart;
    newTotal-= tot;
    localStorage.setItem('totalCost',newTotal);
    document.querySelector('.basketTotal').textContent=newTotal+".00"
    
    let coast=localStorage.getItem('tags');
    coast=JSON.parse(coast);
    let c=box[num].tag;
    if(coast.indexOf(c)>=0){
        let d=coast.indexOf(c);
        coast.splice(d,1);
    }
    localStorage.removeItem('tags')
    localStorage.setItem('tags',JSON.stringify(coast))
    delete box[num];
    localStorage.removeItem('productsInCart');
    localStorage.setItem("productsInCart",JSON.stringify(box));
    
    
}
function increase(products){
    let box=localStorage.getItem('productsInCart')
    box=JSON.parse(box);
    Object.values(box).map(item=>{

    })
}
function start(products){

    let cartItems=localStorage.getItem('tags');
    cartItems=JSON.parse(cartItems);

    if(cartItems !=null){
        if(cartItems[products.name]==undefined && cartItems.indexOf(products.tag)<0)
            {
            cartItems=[
                ...cartItems,
             products.tag
            ]
        }
    }else {
    cartItems=[
        products.tag
    ]
}
    localStorage.setItem("tags",JSON.stringify(cartItems));
}

    
function form(){let boo=[];
    let beast=localStorage.getItem('tags');
    beast=JSON.parse(beast);
    let order=document.querySelector('.ordered');
    
    for(let i=0;i<beast.length;i++){
  boo.push("https"+beast[i]+".jpg");
    }order.value=boo;
    let cartItems=localStorage.getItem('productsInCart')
    cartItems=JSON.parse(cartItems);
    let cont=[];
    Object.values(cartItems).map(item=>{
cont.push(item.inCart)
    })
    
    let order2=document.querySelector('.order2');
    order2.value=cont;
    let total=localStorage.getItem('totalCost');
    total=JSON.parse(total);
    document.querySelector('.totalCost').value=total
}
onLoadCartNumbers()
displayCart()
form()