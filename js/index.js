document.addEventListener("DOMContentLoaded", function() {
//Initialize///////////////////////////////////////////////////////////
function initialize(){
    getBooks()
}

initialize();

//Get Books///////////////////////////////////////////////////////////
function getBooks(){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(bookData => bookData.forEach(book => renderBook(book)))
}

//Render Books///////////////////////////////////////////////////////////
function renderBook(book){

    //Render li///////////////////////////////////////////////////////////
    let li = document.createElement('li')
    li.innerText = `${book.title}`
    document.querySelector('#list-panel').appendChild(li)
    li.addEventListener('click', function(){

        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(function(userData){
            let user = userData[1]
            renderInformation(book, user)
        })

    })
}

//Render Information///////////////////////////////////////////////////////////
function renderInformation(book, user){

    //Remove Books///////////////////////////////////////////////////////////
    document.querySelector('ul').remove()

    //Render ul///////////////////////////////////////////////////////////
    let ul = document.createElement('ul')
    ul.innerHTML = `
    <img src="${book.img_url}">
    <h3 class="title">${book.title}</h3>
    <h3 class="subtitle">${book.subtitle}</h3>
    <h3 class="author">${book.author}</h3>
    <p>${book.description}</p>
    <ul id="user-list"></ul><br>
    <button id="like-btn">LIKE</button>
    `
    document.querySelector('#show-panel').appendChild(ul)

    //Render user-list///////////////////////////////////////////////////////////
    let userNames = book.users

    for(let key of userNames){
        let li = document.createElement('li')
        li.innerHTML = `${key.username}`
        document.querySelector('#user-list').appendChild(li)
    }

    //Remove Undefined///////////////////////////////////////////////////////////
    if(document.querySelector('.subtitle').innerText === 'undefined'){
        document.querySelector('.subtitle').innerText = ``
    }

    //Button///////////////////////////////////////////////////////////
    let btn = document.querySelector('#like-btn')
    btn.addEventListener('click', function(){
        let updatedUsers = book.users
        updatedUsers.push(user)
        console.log(updatedUsers)

        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                accept: "application/json"
            },
            body: JSON.stringify({
                "users": [
                    {
                      "id": 2,
                      "username": "auer"
                    },
                    {
                      "id": 8,
                      "username": "maverick"
                    },
                    {
                        "id": 1,
                        "username": "pouros"
                    }
                  ]
            })
        })
        .then(res => res.json())
        .then(function(data){
            console.log(data)
            fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(function(data){
                console.log(data)
                let appendData = data[1]
                let li = document.createElement('li')
                li.innerHTML = `${appendData.username}`
                document.querySelector('#user-list').appendChild(li)
        })
        })
    })
    
}

});
