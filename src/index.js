console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

//iterate through fetched images and add them to doggo div
function renderImages(json) {
  const dogImageDiv = document.querySelector("#dog-image-container");
  const myArray = json.message;
  for (const element of myArray) {
    let img = document.createElement("IMG");
     img.src = element;
    dogImageDiv.appendChild(img);
  }
}

//retrieve random dog images
function fetchDoggos() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(function(response) {
    return response.json();
  })
  .then(function(json)  {
    //iterate through json.messages
    renderImages(json);
  });
}

function fetchBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    //console.log(json.message)
    //let testObject = json.message
    parseBreeds(json);
  })

}

//take breeds, put them into an array
function parseBreeds(json) {
  const dogUl = document.querySelector("#dog-breeds");
  const allBreeds = json.message;
  for (const breed in allBreeds) {
      if (allBreeds[breed].length > 0) {
        for (const element of allBreeds[breed]) {
          let li = document.createElement("li")
          li.textContent = `${element} ${breed}`
          dogUl.appendChild(li)
        }
      }
      else {
        let li = document.createElement("li")
      li.textContent = breed
      dogUl.appendChild(li)
      }
    }
  }

document.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", event => {
      item.style.color = "coral"
    })
  })
//on page load, get random dog images
//on page load fetch all the dog breeds returned
document.addEventListener("DOMContentLoaded", () => {
  fetchDoggos();
  fetchBreeds();

})
