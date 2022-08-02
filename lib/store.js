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
let storeBtn = document.getElementById("storeNav");

//Event Listeners
if (storeBtn) {
    storeBtn.addEventListener('click', getStore);
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
        <div id="backStoreBtn" class="xButton" style="display: inline-block;min-width: 137px;text-align: center;"><i style="margin-right:0.7em;" class="fa-duotone fa-angles-left"></i> Back to store</div>
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
        <div style="margin-top:1em;width: fit-content;" class="xButton" href="#">Add to Cart <i style="margin-left:0.7em;font-size:smaller;" class="fa-duotone fa-cart-shopping"></i></div>
        </div>
        </div>
        </div>
        </div>
        `;

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById("storeContainer").innerHTML = divs;

    // back button listener from the single product page
    document.getElementById(`backStoreBtn`).addEventListener('click', () => {
        getAllProducts(all_url);
    });
}


// Show all products function (this is where we make the html for the main store page)
function showAllProducts(data) {
    let divs = ``;

    let btns = `<div onclick="main();" class="xButton" style="display: inline-block;text-align: center;"><i style="margin-right:0.7em;" class="fa-duotone fa-house"></i> Home</div>
    <div id="categoryBtn" class="xButton right" style="display: inline-block;text-align: center;"><i style="margin-right:0.7em;" class="fa-duotone fa-list"></i> Categories</div>
    <div id="featuredBtn" class="xButton right" style="display: inline-block;text-align: center;margin-right: 1em;"><i style="margin-right:0.7em;" class="fa-duotone fa-stars"></i> Featured</div>`;

    for (let r of data) {

        divs += `
        

        <div id="productDiv">

        <h1 class="productTitle"><a href='#' onclick='getProduct(${r.id})'>${r.title}</a></h1>
        
        <div class="productImage" style="background-image: url('${r.image}');"></div>
        <div style="float:right;margin-top:-8em;">
        <h3 style="margin-bottom:8px;">$${r.price}</h3>
        ${r.rating.rate} (${r.rating.count} ratings)
        <div style="margin-top:1em;" class="xButton" onclick='getProduct(${r.id})'>View Product <i style="margin-left:0.4em;" class="fa-duotone fa-square-arrow-up-right"></i></div>
        </div>
        
        </div>
        `;
    }

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById("storeContainer").innerHTML = btns;
    document.getElementById("storeContainer").innerHTML += divs;


    document.getElementById(`featuredBtn`).addEventListener('click', () => {
        //alert('Featured!');
    });

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
        let value = $(this).val().toLowerCase();
        $("#productDiv").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});