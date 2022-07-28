// store all element ids in a list
const v = [...document.body.querySelectorAll('[id]')]
    .reduce((list, v) => {
        list[v.id] = document.getElementById(v.id)
        return list
    }, {})



//initialize the store
fetch('assets/html/store.html')
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        let parser = new DOMParser();

        let doc = parser.parseFromString(html, "text/html");
        var parsed = new XMLSerializer().serializeToString(doc);


        v.htmlContainer.innerHTML = parsed;

    })
    .catch(function(err) {
        console.log('Failed to fetch page: ', err);
    });