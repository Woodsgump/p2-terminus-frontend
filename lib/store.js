// all products
const all_url =
    "https://fakestoreapi.com/products/";

//
getAllProducts(all_url);


//
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
<p><img style='max-width:200px;height:auto;' src='${data.image}'></p>
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
    let tab =
        `<tr>
  <th>Image</th>
  <th>Product</th>
  <th>Rating</th>
  <th>Price</th>
</tr>`;


    for (let r of data) {
        tab += `<tr> 
    <td><img style='max-width:100px;height:auto;' src='${r.image}'></td>
    <td><h3><a href='#' onclick='getProduct(${r.id})'>${r.title}</a></h3></td>
    <td>${r.rating.rate} (${r.rating.count} ratings)</td>    
    <td>$${r.price}</td>              
    </tr>`;
    }

    document.getElementById("products").innerHTML = tab;
}

//
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}