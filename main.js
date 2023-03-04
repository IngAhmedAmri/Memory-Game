
var nbCards = 20
var discoveredCard = []
var clickedId=""


// this function "show" represente wen you click to the card if you have in the back othe cards is pishing or no
// next the function will check if the cards are same or not
// next step if the cards are same they will pushed the cards Id in the variable "discoveredCard" also the cards will return in the fisrt step hide.
// if all the cards are flipped with the last condition in the function when discoveredCard is equal to the number of cards.the text will show in the screen "YouWin!"


function show(id) {
  var element = document.getElementById(id);
  element.classList.remove("hide");
  if(clickedId==""){
    clickedId=id
  }
  else if(clickedId!=id){setTimeout(() => { 
    res =isSameCard(id,clickedId) 
   if (!res){
    element.classList.add("hide")
    element = document.getElementById(clickedId)
    element.classList.add("hide")
   }else{
    discoveredCard.push(id,clickedId)
    if(discoveredCard.length==nbCards){
        document.getElementById("result").innerHTML="You Win!"
    }
   }
   clickedId=""}, 1000)
  }
}


var array = [["1","16"],["9","2"],["4","20"],["5","14"],["6","17"],["7","13"],["8","10"],["12","15"],["11","19"],["3","18"]];


// this function "isSameCard" represent the condition if the tow cards clicked are same or are different 

function isSameCard(id1,id2){
for (var i=0; i<array.length;i++){
if (array[i][0]==id1){
return array[i][1]==id2
}
if (array[i][0]==id2){
return array[i][1]==id1
}
}return false
}


// this function "reset" resprente when we will invoked they refresh all the screen

function reset(){
    location.reload()
}
  


