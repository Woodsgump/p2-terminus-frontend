/*
Team Terminus

@authors 
    - Tony Wiedman
    
    
    
*/

let apiUrl = 'http://localhost:8080';
let loggedInCustomer;

let loginNav = document.getElementById('loginNav');
let logoutNav = document.getElementById('logoutNav');
let accountDrpNav = document.getElementById('accountNav');

// retrieve the currently logged in customer from the back end
async function getLoggedInCustomer() {
    let customerId = sessionStorage.getItem('terminus-id');
    if (customerId) {
        let resp = await fetch(apiUrl + '/customer/' + customerId, {
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
    accountDrpNav.style.display = 'inline-block'
    logoutNav.style.display = 'inline-block'
    loginNav.style.display = 'none';
}

function showLoggedOutDisplay() {
    accountDrpNav.style.display = 'none'
    logoutNav.style.display = 'none'
    loginNav.style.display = 'inline-block';
}