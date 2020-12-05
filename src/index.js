//on page load, get random dog images
//on page load fetch all the dog breeds returned
document.addEventListener("DOMContentLoaded", () => {
  fetchDoggos();
  fetchBreeds();
})


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
          li.className = "doggo"
          dogUl.appendChild(li)
          selectBreedByLetterListener(selection)
        }
      }
      else {
        let li = document.createElement("li")
      li.textContent = breed
      li.className = "doggo"
      dogUl.appendChild(li)
      selectBreedByLetterListener(selection)
      }
    }
    document.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", event => {
          item.style.color = "coral"
        })
      })
  }

// filter breeds that start with letter from a dropdown
function selectBreedByLetterListener(selection) {
  const filter = document.querySelector("#breed-dropdown")
  filter.addEventListener("change", function (event) {
    let selection = filter.options[filter.selectedIndex].value
    selectBreedsStartingWing(selection);
  })

  function selectBreedsStartingWing(selection) {
    updateList(breeds.filter(breed =>breed.startsWith(selection)))
  }
}

function updateList(breeds) {
  let breedList = document.querySelector("#dog-breeds");
  removeChildren(breedList);
  breeds.forEach(breed => addBreed(breed));
}
