$( document ).ready(init());

function init(){

var pokemon1 = {
  name: 'blastoise',
  type: 'water',
  stage: '3',
  favourite: 'no',
  src: 'resources/blastoise.jpg'
}

var pokemon2 = {
  name: 'wartortle',
  type: 'water',
  stage: '1',
  favourite: 'yes',
  src: 'resources/wartortle.jpg'
}

var pokemon3 = {
  name: 'squirtle',
  type: 'water',
  stage: '1',
  favourite: 'yes',
  src: 'resources/squirtle.jpg'
}

var pokemon4 = {
  name: 'charizard',
  type: 'fire',
  stage: '3',
  favourite: 'no',
  src: 'resources/charizard.jpg'
}

var pokemon5 = {
  name: 'charmeleon',
  type: 'fire',
  stage: '2',
  favourite: 'no',
  src: 'resources/charmeleon.jpg'
}

var pokemon6 = {
  name: 'charmander',
  type: 'fire',
  stage: '1',
  favourite: 'yes',
  src: 'resources/charmander.jpg'
}

var pokemon7 = {
  name: 'ivysaur',
  type: 'grass',
  stage: '2',
  favourite: 'no',
  src: 'resources/ivysaur.jpg'
}

var pokemon8 = {
  name: 'bulbasaur',
  type: 'grass',
  stage: '1',
  favourite: 'no',
  src: 'resources/bulbasaur.jpg'
}

var allPokemon = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, pokemon7, pokemon8]
var playBoard =[]
var pokeBox = document.querySelectorAll('.pokebox > img')
var selectMsgboxP = document.querySelectorAll('.messageBox p')
var theQuestions = ['identify all the water types', 'identify all the stage 1 pokemons', 'identify any pair of pokemon', 'identify Zhihong/ss fav pokemon']
var timerID = ""

console.log( "ready to go!" )

randomPokeboxes()

  function randomPokeboxes(){
    var tempArrayofBox = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] //this is a problem when the number of boxes change
    tempArrayofBox.sort(function() { return 0.5 - Math.random() })
    console.log(tempArrayofBox)
    randomPlacePokemontoSq(tempArrayofBox)
  }

function randomPlacePokemontoSq(pokeboxArray){
  var arrayCount = 0
  for (var x = 0; x < pokeboxArray.length; x++) {
    console.log('pokecount' + arrayCount)
    console.log('box count' + pokeboxArray[x])
    pokeBox[pokeboxArray[x]].src = allPokemon[arrayCount].src
    playBoard[pokeboxArray[x]] = allPokemon[arrayCount]
    console.log('playboard ' + playBoard[pokeboxArray[x]].name)
    console.log('which pokemon ' + allPokemon[arrayCount].name)
    arrayCount++
    if (arrayCount === 8) {
      arrayCount = 0
    }
  }
  startGame()
}

function startGame(){
  var pressStart = document.querySelector('.buttonStart')
  console.log(pressStart)
  pressStart.addEventListener('click', function(){
    for(var x = 0 ; x <playBoard.length; x++) {
      pokeBox[x].style.opacity = "0";
    }
    selectMsgboxP[0].innerHTML='Key in what you looking for:'
    // startQuestions()
    getPlayerInput()
  })
}

function getPlayerInput(){
  playerInput = document.querySelector('input')
  playerInput.value = ""
  playerInput.addEventListener('keydown', function(){
    if (event.keyCode === 13) {
      console.log(playerInput.value)
      runSearch(playerInput.value)
    }
    if (event.keyCode === 8 || event.keyCode === 46)
      {
        for(var x = 0 ; x <playBoard.length; x++) {
          pokeBox[x].style.opacity = "0";
        }
        playerInput.value = ""  //this doesnt work if the player doesnt clear everything
        selectMsgboxP[1].innerHTML = ""
      }
  })
}

function runSearch(playerText){
  console.log('current search ' + playerText)
  if (searchPokemonName(playerText) != true) {
    if (searchPokemonType(playerText) != true) {
      if (searchPokemonStage(playerText) != true){
        if (searchPokemonFav(playerText) != true){
          selectMsgboxP[1].innerHTML = 'Siow eh... wat u talking'
        }
      }
    }
  }
}

function searchPokemonFav(playerTextFav){
  var ifFound = false
  console.log('favourite: ' + playerTextFav)
  if (playerTextFav.search('favourite') != -1) {
    console.log('confirm.....+ ' + playerTextFav)
    console.log(playerTextFav.search('favourite'))
    for (var x = 0; x<playBoard.length; x++){
      // var matchPokeFav = playBoard[x].fav
      if (playBoard[x].favourite === 'yes') {
        console.log('match found player input ' + playerTextFav)
        console.log('match found pokemon board ' + playBoard[x])
        pokeBox[x].style.opacity=1
        selectMsgboxP[1].innerHTML = 'These are Zhihong/s favourites'
        ifFound = true
      }
    }
  }
  return ifFound
}


function searchPokemonStage(playerTextStage){
  var ifFound = false
  console.log('search type: ' + playerTextStage)
  selectMsgboxP[1].innerHTML = 'No such pokemon'

  var newPlayerTextStage = playerTextStage

  if (/one/.test(playerTextStage) === true) {
    newPlayerTextStage = playerTextStage.replace(/one/i, '1')
    console.log('... replace one...' + newPlayerTextStage)
  }

  if (/two/.test(playerTextStage) === true) {
    newPlayerTextStage = newPlayerTextStage.replace(/two/i, '2')
    console.log('... replace two...' + newPlayerTextStage)
  }

  if (/three/.test(playerTextStage) === true) {
    newPlayerTextStage = newPlayerTextStage.replace(/three/i, '3')
    console.log('... replace three...' + newPlayerTextStage)
  }

  console.log('replaced stage text' + newPlayerTextStage)

  for (var x = 0; x<playBoard.length; x++){
    var matchPokeStage = playBoard[x].stage
    if (newPlayerTextStage.search(matchPokeStage) != -1) {
      console.log('match found player input ' + newPlayerTextStage)
      console.log('match found pokemon board ' + matchPokeStage)
      pokeBox[x].style.opacity=1
      selectMsgboxP[1].innerHTML = 'swee... CAN ..'
      ifFound = true
    }
  }
  return ifFound
}



function searchPokemonType(playerTextType){
  var ifFound = false
  console.log('search type: ' + playerTextType)
  selectMsgboxP[1].innerHTML = 'No such pokemon'

  for (var x = 0; x<playBoard.length; x++){
    var matchPokeType = playBoard[x].type
    if (playerTextType.search(matchPokeType) != -1) {
      console.log('match found player input ' + playerTextType)
      console.log('match found pokemon board ' + matchPokeType)
      pokeBox[x].style.opacity=1
      selectMsgboxP[1].innerHTML = 'swee... CAN ..'
      ifFound = true
    }
  }
  return ifFound
}

function searchPokemonName(playerTextName){
  var ifFound = false
  selectMsgboxP[1].innerHTML = 'No such pokemon'
  for (var x = 0; x<playBoard.length; x++){
    var matchPokeName = playBoard[x].name
    if (playerTextName.search(matchPokeName) != -1) {
      console.log('match found player input ' + playerTextName)
      console.log('match found pokemon board ' + matchPokeName)
      pokeBox[x].style.opacity=1
      selectMsgboxP[1].innerHTML = 'swee... CAN ..'
      ifFound = true
    }
  }
  return ifFound
}


} // for function init ()
