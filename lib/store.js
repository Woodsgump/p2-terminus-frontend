/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/


// The fake store api endpoint this will be replaced with our local endpoint
// once we have the backend setup
const all_url =
    "https://fakestoreapi.com/products/";

let catBtn = document.getElementById("categoryBtn");
let cartBtn = document.getElementById("cartBtn");
let storeBtn = document.getElementById("storeNav");
let storeRows = document.getElementById("storeRows");
let storeBtns = document.getElementById("storeBtnContainer");
let tbodyRef = document.getElementById('storeRows').getElementsByTagName('tbody')[0];
let date = new Date()
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let fullDate = `${month}.${day}.${year}.`
let cart = [{

}]

function makeJSON() {

    let order = {
        orderDate: fullDate,
        totalPrice: 65,
        products: {
            endpoint: cart.map(product => ({ endpoint: `http://fakestoreapi.com/products/${product.id}` })),
        }
    }

    let orderJSON = JSON.stringify(order)

    console.log(orderJSON);

}

//Event Listeners
if (storeBtn) {
    storeBtn.addEventListener('click', getStore);
}

if (cartBtn) {
    cartBtn.addEventListener('click', addCart);
}
// Initialize the store as main page
//getStore();

// init function
function getStore() {
    getAllProducts(all_url)
}

function getCategory() {
    alert('Category');
}

function addCart() {
    console.log(cart)
}
// Fetch all products from the endpoint
async function getAllProducts(url) {

    // Storing response
    let response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }

    // Pass the response data to the showAllProducts function for styling/html
    showAllProducts(data);
}


// Fetch a single product from the endpoint
async function getProduct(id) {
    let response = await fetch(`${all_url}${id}`);
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }

    //Pass the single product data to the showProduct funtion for styling/html
    showProduct(data);
}


// Show single product function (this is where we make the html for the single product page)
function showProduct(data) {
    let divs = ``;

    divs += `
    <div onclick="main();" id="backBtn" class="xButton" style="display: inline-block;min-width: 113px;text-align: center;"><i style="margin-right:0.5em;" class="fa-duotone fa-house"></i> Home</div>
    <div onclick="getStore();" id="storeBtn" class="xButton" style="display: inline-block;min-width: 113px;text-align: center;"><i style="margin-right:0.5em;" class="fa-duotone fa-shop"></i></i> Store</div>
        <div id="singleProductDiv">

        <h1 class="productTitle">${data.title}</h1>
        <h3>Category: ${data.category}</h3>

        <div class="row">

        <div class="column">
        <div class="singleProductImage" style="background-image: url('${data.image}');"></div>
        </div>
        <div class="column">
        ${data.description}

        <div class="singlePriceBox">
        <h3 style="margin-top:2em;margin-bottom:8px;">$${data.price}</h3>
        ${data.rating.rate} (${data.rating.count} ratings)
        <div id="cartBtn" onclick="update_cart(${data.id}, 1, '${data.title}');added();" style="margin-top:1em;width: fit-content;" class="xButton" href="#">Add to Cart <i style="margin-left:0.7em;font-size:smaller;" class="fa-duotone fa-cart-shopping"></i></div>
        </div>
        </div>
        </div>
        </div>
        `;

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'inline-block';
    document.getElementById("storeBtnContainer").style.display = 'none';
    document.getElementById("storeItemContainer").innerHTML = divs;
    document.getElementById('cartContainer').style.display = 'none';



}


function added() {
    alert('added to cart!');
}

// Show all products function (this is where we make the html for the main store page)
function showAllProducts(data) {
    $('#storeRows tbody').empty();
    for (let r of data) {

        let newRow = tbodyRef.insertRow();
        let newCell = newRow.insertCell();


        let productDiv = document.createElement('div');
        productDiv.setAttribute('id', 'productDiv');

        let h1 = document.createElement("h1")
        h1.setAttribute('class', 'productTitle');
        h1.setAttribute("onClick", `javascript: getProduct('${r.id}');`);
        let text = document.createTextNode(r.title);
        h1.appendChild(text);

        let productImage = document.createElement('div');
        productImage.setAttribute('class', 'productImage');
        productImage.style.backgroundImage = `url('${r.image}')`;

        let rightDiv = document.createElement('div');
        rightDiv.style.float = 'right';
        rightDiv.style.marginTop = '-8em'
        rightDiv.innerHTML = `
        <h3 style="margin-bottom:8px;">$${r.price}</h3>
        ${r.rating.rate} (${r.rating.count} ratings)
        <div style="margin-top:1em;" class="xButton" onclick='getProduct(${r.id})'>View Product <i style="margin-left:0.4em;" class="fa-duotone fa-square-arrow-up-right"></i></div>
        `;

        productDiv.appendChild(h1);
        productDiv.appendChild(productImage);
        productDiv.appendChild(rightDiv);
        /*
                div = `
                <div id="productDiv">
                <h1 class="productTitle"><a href='#' onclick='getProduct(${r.id})'>${r.title}</a></h1>
                <div class="productImage" style="background-image: url('${r.image}');"></div>
                <div style="float:right;margin-top:-8em;">
                <h3 style="margin-bottom:8px;">$${r.price}</h3>
                ${r.rating.rate} (${r.rating.count} ratings)
                <div style="margin-top:1em;" class="xButton" onclick='getProduct(${r.id})'>View Product <i style="margin-left:0.4em;" class="fa-duotone fa-square-arrow-up-right"></i></div>
                </div>
                </div>
                `;*/

        newCell.appendChild(productDiv);
    }

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById("storeBtnContainer").style.display = 'inline-block';
    document.getElementById('cartContainer').style.display = 'none';
}



//document.getElementById("storeContainer").innerHTML += divs;

if (document.getElementById(`featuredBtn`)) {
    document.getElementById(`featuredBtn`).addEventListener('click', () => {
        //alert('Featured!');
    });
}

if (document.getElementById(`categoryBtn`)) {
    document.getElementById(`categoryBtn`).addEventListener('click', () => {
        //alert('Categories!');
    });
}

//hide fetch loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}


$(document).ready(function() {
    $("#filterSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#storeRows tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


const update_cart = (id, quantity, name) => {
    let item = cart.find(item => item.id === id)
        // Product is already in cart, need to increment
    if (item) {
        item.quantity = item.quantity + quantity
    }
    // Product is not in cart, need to add it
    else {
        cart.push({
            id,
            name,
            quantity
        })
    }
    document.getElementById('cartBtn').innerHTML = `Added <i style='margin-left:0.7em;font-size:smaller;' class='fa-duotone fa-circle-check'></i>`;

    console.log(cart);

}


function getCart() {

    let container = document.getElementById('cartContainer');
    container.innerHTML = ``;

    let h1 = document.createElement('h1')
    h1.innerText = `Your Shopping Cart`;
    container.appendChild(h1);

    for (let product of cart) {

        if (!product.id) {
            //no product?
        } else {
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.innerHTML = '<b>Product Name:</b> ' + product.name;
            p2.innerHTML = '<b>Quanity:</b> ' + product.quantity;

            container.appendChild(p1);
            container.appendChild(p2);
        }

    }

    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'none';
    document.getElementById('storeItemContainer').style.display = 'none';
    document.getElementById("storeBtnContainer").style.display = 'none';
    container.style.display = 'inline-block'
}