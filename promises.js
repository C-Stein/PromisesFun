console.log("promises");
//////////////////////////
///// THE BROKEN WAY /////
//////////////////////////
// var suspects;
// var weapons;
// var rooms;

// function doSuspects(e){
//   var data = JSON.parse(e.target.responseText)
//   suspects = data.suspects
// }

// function doWeapons(e){
//   var data = JSON.parse(e.target.responseText)
//   weapons = data.weapons
// }

// function doRooms(e){
//   var data = JSON.parse(e.target.responseText)
//   rooms = data.rooms
// }

// function returnRandom(min, max){
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// //document.getElementById("theButton").addEventListener("click", findGuess)

// var request1 = new XMLHttpRequest()
// request1.addEventListener("load", doSuspects)
// request1.open("GET", "suspects.json")
// request1.send()

// var request2 = new XMLHttpRequest()
// request2.addEventListener("load", doWeapons)
// request2.open("GET", "weapons.json")
// request2.send()

// var request3 = new XMLHttpRequest()
// request3.addEventListener("load", doRooms)
// request3.open("GET", "rooms.json")
// request3.send()

// function findGuess(){
//   var suspectGuess = suspects[returnRandom(0, 5)].name
//   var weaponGuess = weapons[returnRandom(0, 5)].name
//   var roomGuess = rooms[returnRandom(0, 6)].name
//   console.log(`It was ${suspectGuess} in the ${roomGuess}, with the ${weaponGuess}`)
// }

// findGuess()

//////////////////////////
///// CALLBACK HELL  /////
//////////////////////////

// var suspects;
// var weapons;
// var rooms;

// function doSuspects(e){
//   var data = JSON.parse(e.target.responseText)
//   suspects = data.suspects
// }

// function doWeapons(e){
//   var data = JSON.parse(e.target.responseText)
//   weapons = data.weapons
// }

// function doRooms(e){
//   var data = JSON.parse(e.target.responseText)
//   rooms = data.rooms
//   findGuess()
// }

// function returnRandom(min, max){
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// //this isn't callback hell =-( )
// window.setTimeout(function() { //makes sure that this function takes at least one second
//   var request1 = new XMLHttpRequest()
//   request1.addEventListener("load", doSuspects)
//   request1.open("GET", "https://cluebot-fbda0.firebaseio.com/.json", false)
//   request1.send()
//     window.setTimeout(function() { //makes sure that this function takes at least one second
//       var request2 = new XMLHttpRequest()
//       request2.addEventListener("load", doWeapons)
//       request2.open("GET", "https://cluebot-fbda0.firebaseio.com/.json", false)
//       request2.send()
//       window.setTimeout(function() { //makes sure that this function takes at least one second
//         var request3 = new XMLHttpRequest()
//         request3.addEventListener("load", doRooms)
//         request3.open("GET", "https://cluebot-fbda0.firebaseio.com/.json", false)
//         request3.send()
//       }, 500)
//     }, 750)
// }, 1000)

// function findGuess(){
//   var suspectGuess = suspects[returnRandom(0, 5)].name
//   var weaponGuess = weapons[returnRandom(0, 5)].name
//   var roomGuess = rooms[returnRandom(0, 6)].name
//   console.log(`It was ${suspectGuess} in the ${roomGuess}, with the ${weaponGuess}`)
// }

//////////////////////////
/////   PROMISES     /////
//////////////////////////

var suspects;
var weapons;
var rooms;

function returnRandom(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var promise1 = new Promise(function(resolve, reject){ 
  var request1 = new XMLHttpRequest()
  request1.addEventListener("load", function() {
    var list = JSON.parse(request1.responseText).suspects
    resolve(list)
  })
  request1.open("GET", "suspects.json")
  request1.send()
})

var promise2 = new Promise(function(resolve, reject){
  var request2 = new XMLHttpRequest()
  request2.addEventListener("load", function() {
    var list = JSON.parse(request2.responseText).weapons
    resolve(list)
  })
  request2.open("GET", "weapons.json")
  request2.send()
})

var promise3 = new Promise(function(resolve, reject){
  var request3 = new XMLHttpRequest()
  request3.addEventListener("load", function() {
    var list = JSON.parse(request3.responseText).rooms
    resolve(list)
  })
  request3.open("GET", "rooms.json")
  request3.send()
})

///////put the logic in one  function///////

// function getJSON (listToGet) {
//   return new Promise(function(resolve, reject){
//     var xhr = new XMLHttpRequest()
//     xhr.addEventListener("load", function() {
//       var list = JSON.parse(xhr.responseText)[listToGet];
//       window[listToGet] = list
//       //console.log('got ' + listToGet)

//       resolve()
//     })
//     console.log(listToGet);
//     xhr.open("GET", `${listToGet}.json`)
//     xhr.send()
//   })
// }
// //example of chaining promises in ajax file
// getJSON("suspects")
//   .then(() => getJSON("weapons"))
//   .then(() => getJSON("rooms"))
//   .then(findGuess) 
/////////////////////////////////////////////////////
///Single Promise////////////////////////////////////

// promise1.then(
//   function(val){
//     var obj = JSON.parse(val)
//     suspects = obj.suspects
//     console.log(suspects)
//     findGuess()
//   }
// )
/////////////////////////////////////////////////////
///All the Promises////////////////////////////////////

Promise.all([promise1, promise2, promise3])
  .then(function(values) {
    suspects = values[0]
    weapons = values[1]
    rooms = values[2]
    findGuess()
  })

function findGuess(){
  var suspectGuess = suspects[returnRandom(0, 5)].name
  var weaponGuess = weapons[returnRandom(0, 5)].name
  var roomGuess = rooms[returnRandom(0, 6)].name
  console.log(`It was ${suspectGuess} in the ${roomGuess}, with the ${weaponGuess}`)
}
