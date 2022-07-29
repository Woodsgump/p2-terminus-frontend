/*
Team Terminus

@authors 
    - Tony Wiedman
    
*/

let apiUrl = 'http://localhost:8080';
let loggedInCustomer;
let loggedInNav = document.getElementById('loggedIn');

// retrieve the currently logged in customer from the back end
async function getLoggedInCustomer() {
    let customerId = sessionStorage.getItem('terminus-id');
    if (customerId) {
        let resp = await fetch(apiUrl + '/customers/' + customerId, {
            headers: new Headers({
                'Auth': sessionStorage.getItem('terminus-tkn')
            })
        });

        if (resp.ok) {
            loggedInCustomer = await resp.json();
        }
    }

    if (loggedInCustomer) {
        showLoggedInDisplay();
    } else {
        showLoggedOutDisplay();
    }

}

function showLoggedInDisplay() {
    loggedInNav.style.display = 'inline-block'
}

function showLoggedOutDisplay() {
    loggedInNav.style.display = 'none'
}