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


const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}

function toggleItem() {
    if (this.classList.contains("submenu-active")) {
        this.classList.remove("submenu-active");
    } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        this.classList.add("submenu-active");
    } else {
        this.classList.add("submenu-active");
    }
}

function closeSubmenu(e) {
    if (menu.querySelector(".submenu-active")) {
        let isClickInside = menu
            .querySelector(".submenu-active")
            .contains(e.target);

        if (!isClickInside && menu.querySelector(".submenu-active")) {
            menu.querySelector(".submenu-active").classList.remove("submenu-active");
        }
    }
}


toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
    if (item.querySelector(".submenu")) {
        item.addEventListener("click", toggleItem, false);
    }
    item.addEventListener("keypress", toggleItem, false);
}

document.addEventListener("click", closeSubmenu, false);