// all products
const all_url =
    "https://fakestoreapi.com/products/";


//
document.getElementById("storeNav").addEventListener('click', getStore);

//
getStore();



////
function getStore() {
    getAllProducts(all_url)
}


async function getAllProducts(url) {

    // Storing response
    let response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    showAllProducts(data);
}


//
async function getProduct(id) {
    let response = await fetch(`${all_url}${id}`);
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    showProduct(data);
}


//
function showProduct(data) {
    let tab =
        `<tr>
  <th><a href="#" id="backStoreBtn">[Back to store]</a></th>
  <th>Description</th>
  <th>Rating</th>
  <th>Price</th>
</tr>`;
    tab += `<tr> 
<td>
<h3>${data.title}</h3>
<i>Category: </i> ${data.category}
<p><img style='max-width:300px;height:auto;' src='${data.image}'></p>
</td> 
<td>${data.description}</td>
<td>${data.rating.rate} (${data.rating.count} ratings)</td>    
<td>${data.price}</td>              
</tr>`;

    document.getElementById("products").innerHTML = tab;

    document.getElementById(`backStoreBtn`).addEventListener('click', () => {
        getAllProducts(all_url);
    });
}

//
function showAllProducts(data) {
    let tab = ``;


    for (let r of data) {

        tab += `
        <div id="productDiv">

        <h1><a href='#' onclick='getProduct(${r.id})'>${r.title}</a></h1>
        
        <div style="width:100px;height:100px;border-radius:0.5em;background-position: center center;background-color:#fff;padding:0.5em;background-image: url('${r.image}');background-size:contain;background-repeat: no-repeat;"></div>
        <div style="float:right;margin-top:-7em;">
        <h3 style="margin-bottom:8px;">$${r.price}</h3>
        ${r.rating.rate} (${r.rating.count} ratings)
        <div style="margin-top:1em;" class="xButton" href="#">Add to Cart</div>
        </div>
        
        </div>
        `;
    }

    document.getElementById("products").innerHTML = tab;
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}