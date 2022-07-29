/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/
getLoggedInCustomer().then(setup);

function setup() {
    if (loggedInCustomer) {
        showOrders();
    } else {
        window.location.href = './index.html';
    }
}

function showOrders() {
    let orders = loggedInCustomer.orders;
    let ordersDiv = document.getElementById('ordersDiv');

    for (let order of orders) {
        // create a div for each order
        let div = document.createElement('div');
        div.setAttribute("class", "orderItem");

        let orderProducts = orderProductString(order.products);
        div.innerHTML = `
            <p>${order.orderid}</p>
            <p>${order.orderdate}</p>
            <p>${order.totalprice}</p>
            <p>${order.species.name}</p>
        `;
        ordersDiv.appendChild(div);
    }
}

function orderProductString(products) {
    if (products.length > 0) {
        let productsString = '<ul>';
        for (let product of products) {
            productsString += `<li>${product.productName}</li><li>${product.price}</li>`;
        }
        return productsString + '</ul>';
    } else {
        return 'none';
    }
}