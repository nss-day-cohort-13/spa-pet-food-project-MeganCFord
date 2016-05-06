// Your first task is to build a product page that displays all brands of dog food, the different types, with the price and size for each container volume.


//DOM getter variable
var dogContentDiv = document.getElementById("dogContent");
var catContentDiv = document.getElementById("catContent");

//I used the 'append child' method to CREATE a div for each loop-through, just in case. It seems like better practice for future functionality. Declared out here so I can use them for both cats and dogs.
var makeMasterdogDiv = function() {
  let masterDiv = document.createElement("div");
  masterDiv.className = "masterdiv col-xs-6";
  dogContentDiv.appendChild(masterDiv);
  return masterDiv;
}

var makeMastercatDiv = function() {
  let masterDiv = document.createElement("div");
  masterDiv.className = "masterdiv col-xs-6 cat";
  catContentDiv.appendChild(masterDiv);
  return masterDiv;
}
var makeTypeDiv = function() {
  let typeDiv = document.createElement("div");
  typeDiv.className = "typeDiv";
  masterDiv.appendChild(typeDiv);
  return typeDiv;
}
//div for breeds, only used during cat loop. to make all the breeds appear in a row.
var makeBreedDiv = function() {
  let breedDiv = document.createElement("p");
  breedDiv.className = "breedDiv";
  masterDiv.appendChild(breedDiv);
  breedDiv.innerHTML = `ideal for breeds: `
  return breedDiv;
}

var makeVolumeDiv = function() {
  let volumeDiv = document.createElement("p");
  volumeDiv.className = "volumeDiv";
  typeDiv.appendChild(volumeDiv);
  return volumeDiv;
} 
//====================
//function that runs when DOG json is loaded: a series of nested forEach loops. Probably rather a time-consuming method since each loop and subloop and sub-subloop drills top-down through the json each time. 
//====================
var createdogcard = function() {
  console.log("dog food loaded");
  //parse dog food object.
  var dogFood = JSON.parse(dogFoodRequest.responseText);
  console.log("dog food object", dogFood );
  
  //loop one: create master div with brand title.
  dogFood.dog_brands.forEach(function(brand, brandindex){
    masterDiv = makeMasterdogDiv();
    console.log("brand of dog food", brand.name );
    masterDiv.innerHTML = `<h4 class = "brandname">${brand.name}</h4>`;
  
    //loop two (nested): create type div with title.
    brand.types.forEach(function(type, typeindex) {
      typeDiv = makeTypeDiv();
      console.log("type of dog food", type.type);
      typeDiv.innerHTML = `<p class="foodtype">${type.type}</p>`
      
      //loop three (nested): create volume/price div function. 
      type.volumes.forEach(function(volume, volumeindex){
        volumeDiv = makeVolumeDiv();
        console.log("volume name", volume.name );
        volumeDiv.innerHTML = `Size: ${volume.name};  Price: ${volume.price}`
      });
    });
  });
}

//function in case either JSON load fails. 

var failedToLoad = function() {
  throw "json failed to load.";
}

//xml http request to go get the dogfood.json and put it into a card creator function when loaded.
var dogFoodRequest = new XMLHttpRequest();
dogFoodRequest.open("GET", "dogfood.json");
dogFoodRequest.send();
dogFoodRequest.addEventListener("load", createdogcard);
dogFoodRequest.addEventListener("error", failedToLoad);


// Once you have all of that information listed, you need to create a second JSON file to represent the new product line for Acme, Inc. They now want to sell cat food. Your product owner gives you a spreadsheet with all the new data in it. It is your job to get this data represented correctly in JSON format and then update your page to now show cat food, along with dog food.

var createcatcard = function() {
console.log("cat food loaded");
  //parse cat food object.
  var catFood = JSON.parse(catFoodRequest.responseText);
  console.log("cat food object", catFood );
  
  //loop one: create master div with brand title.
  catFood.cat_brands.forEach(function(brand, brandindex){
    masterDiv = makeMastercatDiv();
    console.log("brand of cat food", brand.name );
    masterDiv.innerHTML = `<h4 class = "brandname">${brand.name}</h4>`;
    
    //first nested loop within master div: cat breeds. no subloops. note I used CSS to add the semicolon to all but the last item in this loop. 
    breedDiv = makeBreedDiv();
    brand.breeds.forEach(function(breed, breedindex){
      console.log("cat breed", breed);
      breedDiv.innerHTML += `<span class="abreed">${breed}</span>`
    });

    //second nested loop within master div: create type div with title.
    brand.types.forEach(function(type, typeindex) {
      typeDiv = makeTypeDiv();
      console.log("type of cat food", type.type);
      typeDiv.innerHTML = `<p class="foodtype">${type.type}</p>`
      
      //loop three (nested): create volume/price div function. 
      type.volumes.forEach(function(volume, volumeindex){
        volumeDiv = makeVolumeDiv();
        console.log("volume name", volume.name );
        volumeDiv.innerHTML = `Size: ${volume.name};  Price: ${volume.price}`
      });
    });
  });
}


//xml http request to go get the catfood.json and put it into a card creator function when loaded.
var catFoodRequest = new XMLHttpRequest();
catFoodRequest.open("GET", "catfood.json");
catFoodRequest.send();
catFoodRequest.addEventListener("load", createcatcard);
catFoodRequest.addEventListener("error", failedToLoad);
