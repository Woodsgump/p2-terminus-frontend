getLoggedInCustomer();

async function saveOrder(event) {
    if (loggedInUser) {

        let orderId = event.target.id.substring(6); // adopt_${id}
        let order = await getOrder(orderId);
        if (order) {
            let resp = await fetch(apiUrl + '/orders/' + orderId + '/order/' + loggedInUser.id, {
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