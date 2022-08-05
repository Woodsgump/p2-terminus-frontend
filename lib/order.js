getLoggedInCustomer();


function createOrder() {
    alert(`Create order! Debug in console`)
    console.log('Create order, get order id in return response, then call function to post products to order id\nPRODUCTS to insert: \n')
    cart.forEach(function(product) {
        if (typeof product.id !== "undefined") {

            let resp = await fetch(apiUrl + '/order', {
                method: 'POST',
                body: JSON.stringify(loggedInUser.id),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            if (resp.status === 200) {
                orderReturn = await resp.json();
                if (orderReturn) {
                    alert('Order Id: ' + orderReturn.orderId);
                }
            } else {
                alert('Something went wrong!');
                msgSpan.innerText = 'Something went wrong!';
            }

            console.log('Name: ' + product.name);
            console.log('Endpoint: https://fakestoreapi.com/products/' + product.id);
            console.log('Price: $' + product.price);
        }
    });
}

async function saveOrder(event) {
    if (loggedInUser) {

        let orderId = event.target.id.substring(6); // adopt_${id}

        let order = await getOrder(orderId);
        if (order) {
            let resp = await fetch(apiUrl + '/order/' + orderId + '/order/' + loggedInUser.id, {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Auth': sessionStorage.getItem('terminus-tkn')
                })
            });

            if (resp.ok) {
                loggedInUser = await resp.json();
                // remove the row holding the td holding the button
                petsTable.removeChild(event.target.parentElement.parentElement);
            }
        }
    }
}

async function getOrder(orderId) {
    let resp = await fetch(apiUrl + '/order/' + petId);
    if (resp.ok) {
        return await resp.json();
    }
}