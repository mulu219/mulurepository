var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var searchButton = document.getElementById("searchButton");
var input = document.getElementById("search")
var pictures = document.getElementById("pictures")
var menu = document.getElementById("menu")
var menuList = []


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
function getFood() {
  pictures.innerHTML = ""
  const userAction = async () => {
    const response = await fetch(`https://api.spoonacular.com/food/menuItems/search?apiKey=dc2ab9f3ac14425186bc86033906044e&number=4&query=${input.value}`);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    
    console.log(myJson)
  myJson.menuItems.forEach(item => {
    var image = document.createElement("img")
    image.src = item.image
    image.addEventListener('click', ()=> addToMenu(item.title))
    pictures.appendChild(image)
  })
  
  }

  userAction()
}
function addToMenu(item) {
 var menuItem = document.createElement("li")
console.log(item)
menuItem.innerHTML = item
menu.appendChild(menuItem)
menuList.push(item)
}
function clearMenu() {
  menu.innerHTML = ""
  menuItems = []
}
function order() {
  var orderNumber = Math.floor(Math.random() *1000)
  var customerName = prompt("what is the name of the customer?")
  var xhr = new XMLHttpRequest();
    xhr.open("POST", "/order", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "orderNumber": orderNumber,
        "name": customerName,
        "menu": menuList
    }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var jsonResponse = JSON.parse(xhr.responseText)
            window.location.replace(jsonResponse.redirectRoute)
        }
    }
}
function completeOrder(item) {
console.log(item)
var children = item.childNodes
var orderNumber = children[1].innerText.trim()
console.log(orderNumber)
var customerName = children[3].innerText.trim()
var menuList = children[5].innerText.trim()
var xhr = new XMLHttpRequest();
    xhr.open("delete", "/order", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "orderNumber": parseInt(orderNumber),
        "name": customerName,
        
    }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var jsonResponse = JSON.parse(xhr.responseText)
            window.location.replace(jsonResponse.redirectRoute)
        }
    }
}