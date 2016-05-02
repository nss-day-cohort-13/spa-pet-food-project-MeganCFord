
//DOM getter variables
var mainContentDiv = document.getElementById("mainContent");




var createcard = function() {
  console.log("dog food loaded");

  var dogFood = JSON.parse(dogFoodRequest.responseText);
  console.log("dog food object", dogFood );

  function makeMasterDiv() {
    let masterDiv = document.createElement("div");
    masterDiv.className = "masterdiv";
    mainContentDiv.appendChild(masterDiv);
    return masterDiv;
  }
  dogFood.dog_brands.forEach(function(brand, brandindex){
    var masterDiv = makeMasterDiv();
    console.log("brand of dog food", dogFood.dog_brands[brandindex].name );
    masterDiv.innerHTML = `<h4>${dogFood.dog_brands[brandindex].name}</h4>`;

    function makeTypeDiv() {
      let typeDiv = document.createElement("div");
      typeDiv.className = "typeDiv";
      masterDiv.appendChild(typeDiv);
      return typeDiv;
    }
    dogFood.dog_brands[brandindex].types.forEach(function(type, typeindex) {
      var typeDiv = makeTypeDiv();
      console.log("type of dog food", dogFood.dog_brands[brandindex].types[typeindex].type);
      typeDiv.innerHTML = `<p>${dogFood.dog_brands[brandindex].types[typeindex].type}</p>`
    })
  });


}

// Your first task is to build a product page that displays all brands of dog food, the different types, with the price and size for each container volume.

var failedToLoad = function() {
  console.log("json failed to load.");
}

//xml http request to go get the dogfood.json and put it into the createcard function when loaded.
var dogFoodRequest = new XMLHttpRequest();
dogFoodRequest.open("GET", "dogfood.json");
dogFoodRequest.send();
dogFoodRequest.addEventListener("load", createcard);
dogFoodRequest.addEventListener("error", failedToLoad);

// Once you have all of that information listed, you need to create a second JSON file to represent the new product line for Acme, Inc. They now want to sell cat food. Your product owner gives you a spreadsheet with all the new data in it. It is your job to get this data represented correctly in JSON format and then update your page to now show cat food, along with dog food.
