/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/


// The fake store api endpoint this will be replaced with our local endpoint
// once we have the backend setup
const all_url =
    "https://fakestoreapi.com/products/";


//Event Listeners
document.getElementById("storeNav").addEventListener('click', getStore);


// Initialize the store as main page
//getStore();

// init function
function getStore() {
    getAllProducts(all_url)
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

    //Todo: not using a table anymore make div's
    let tab =
        `<tr>
            <th><a href="#" id="backStoreBtn">[Back to store]</a></th>
            <th>Description</th>
            <th>Rating</th>
            <th>Price</th>
        </tr>`;


    tab += `
        <tr> 
            <td>
            <h3>${data.title}</h3>
            <i>Category: </i> ${data.category}
            <p><img style='max-width:300px;height:auto;' src='${data.image}'></p>
            </td> 
            <td>${data.description}</td>
            <td>${data.rating.rate} (${data.rating.count} ratings)</td>    
            <td>${data.price}</td>              
        </tr>`;

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById("storeContainer").innerHTML = tab;

    // back button listener from the single product page
    document.getElementById(`backStoreBtn`).addEventListener('click', () => {
        getAllProducts(all_url);
    });
}


// Show all products function (this is where we make the html for the main store page)
function showAllProducts(data) {
    let divs = ``;


    for (let r of data) {

        divs += `
        <div id="productDiv">

        <h1 class="productTitle"><a href='#' onclick='getProduct(${r.id})'>${r.title}</a></h1>
        
        <div class="productImage" style="background-image: url('${r.image}');"></div>
        <div style="float:right;margin-top:-8em;">
        <h3 style="margin-bottom:8px;">$${r.price}</h3>
        ${r.rating.rate} (${r.rating.count} ratings)
        <div style="margin-top:1em;" class="xButton" href="#">Add to Cart <i style="margin-left:0.7em;font-size:1rem;" class="fa-duotone fa-cart-shopping"></i></div>
        </div>
        
        </div>
        `;
    }

    // Hide contentContainer(normal html pages) and display storeContainer(store page)
    // Then apply the html and styling to the storeContainer div in the index/main page
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('storeContainer').style.display = 'inline-block';
    document.getElementById("storeContainer").innerHTML = divs;

}

//hide fetch loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}