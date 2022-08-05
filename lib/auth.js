/*
Team Terminus

@authors 
    - Tony Wiedman
    
    
    
*/

let apiUrl = 'http://p2terminusoms-env.eba-fcyktpid.us-east-1.elasticbeanstalk.com';
let loggedInCustomer;

//let loginNav = document.getElementById('loginNav');
//let logoutNav = document.getElementById('logoutNav');


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

let loginBtn = document.getElementById("topLoginBtn");
let signupBtn = document.getElementById("topSignupBtn");


function showLoggedInDisplay() {
    document.getElementById('accountNav').style.display = 'inline-block'

    if (loginBtn) {
        loginBtn.style.display = 'none';
    }

    if (signupBtn) {
        signupBtn.style.display = 'none';
    }


}

function showLoggedOutDisplay() {
    document.getElementById('accountNav').style.display = 'none'
    if (loginBtn) {
        loginBtn.style.display = 'inline-block';
    }

    if (signupBtn) {
        signupBtn.style.display = 'inline-block';
    }
    //logoutNav.style.display = 'none'
    //loginNav.style.display = 'inline-block';
}

function logOut() {
    loggedInCustomer = null;
    sessionStorage.clear();
    showLoggedOutDisplay();
}