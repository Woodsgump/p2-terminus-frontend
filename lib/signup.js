/*
Team Terminus

@authors
    - Noah Cavazos
    - Tony Wiedman
*/
let signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', signup);

async function signup(){
    //alert('Not yet implemented on the backend');
    let msgSpan = document.getElementById('msg');
    msgSpan.innerText = '';

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let credentials = {firstname: fname, lastname: lname, email: email, username: username, password: password};

    let resp = await fetch(apiUrl + '/auth', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    if(resp.status === 200){
        loggedInCustomer = await resp.json();
        if(loggedInCustomer){
            sessionStorage.setItem('terminus-tkn', resp.headers.get('Auth'));
            sessionStorage.setItem('terminus-id', loggedInCustomer.id);
            window.location.href = './index.html';
        }
    } else {
        msgSpan.innerText = 'Error in the sign up process, try again!';
    }
}