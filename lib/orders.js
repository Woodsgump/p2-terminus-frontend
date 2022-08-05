/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/
getLoggedInCustomer();


function showOrders() {
    let orders = loggedInCustomer.orders;
    let ordersDiv = document.getElementById('orderContainer');

    for (let order of orders) {
        // create a div for each order
        let div = document.createElement('div');
        div.setAttribute("class", "orderItem");

        let orderProducts = orderProductString(order.products);
        div.innerHTML = `
            <p>${order.orderId}</p>
            <p>${order.orderDate}</p>
            <p>${order.totalPrice}</p>
            <p>${orderProducts}</p>
        `;
        ordersDiv.appendChild(div);
        ordersDiv.style.display = 'inline-block'
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