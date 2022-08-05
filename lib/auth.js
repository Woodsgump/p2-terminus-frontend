/*
Team Terminus

@authors 
    - Tony Wiedman

*/

let apiUrl = 'http://p2terminusoms-env.eba-fcyktpid.us-east-1.elasticbeanstalk.com';
let loggedInCustomer;


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
}

function logOut() {
    loggedInCustomer = null;
    sessionStorage.clear();
}