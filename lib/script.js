// store all element ids in a list
const v = [...document.body.querySelectorAll('[id]')]
    .reduce((list, v) => {
        list[v.id] = document.getElementById(v.id)
        return list
    }, {})


//

v.loginNav.addEventListener('click', loginFetch);
v.signupNav.addEventListener('click', signupFetch);


function loginFetch() {
    getResource('assets/html/login.html');
}

function signupFetch() {
    getResource('assets/html/signup.html');
}




async function getResource(html) {
    let response = await fetch(html)
    let data = await response.text();

    if (response) {
        hideloader();
    }
    parseHtml(data);

}

function parseHtml(data) {
    let parser = new DOMParser();

    let doc = parser.parseFromString(data, "text/html");
    var parsed = new XMLSerializer().serializeToString(doc);


    v.accountContainer.innerHTML = parsed;
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}