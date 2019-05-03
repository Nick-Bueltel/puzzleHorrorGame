//define constants from html 
var image = document.getElementById("imageA");
var inputBox = document.getElementById("inputBox");
var boxButton = document.getElementById("boxButton");
var onlyButton = document.getElementById("onlyButton");
var title = document.getElementById("title");


//define audio constants to call inside of the objects.
var hahah = new Audio('SE/ahaha.wav');
var cicadas = new Audio("SE/cicadas.ogg");

//puzzles - please dont spoil it for yourself. 
class Puzzle{
    constructor(file, pass, bgm){
    this.solved = false; 
    this.file = file;
    this.pass = pass;
    this.played = false; 
    this.bgm = bgm;
    }
    //solved function - display 'prize' - reset page
    winner(){
        if(this.solved === true){
            this.image = '#';
        }
    }
    //reset page function, decided to bake into puzzle class to avoid
    //repetition
    reset(){
        location.reload(true);
    }
};

//define puzzle objects from class 
const puzzle1 = new Puzzle('https://i.imgur.com/j0UMwfZ.jpg', '19140728', cicadas);
const puzzle2 = new Puzzle('https://i.imgur.com/NqkqByd.jpg', '682', cicadas);
const puzzle3 = new Puzzle('https://i.imgur.com/3PBJQOy.jpg', '137', cicadas);
const puzzle4 = new Puzzle('#', '#');

//puzzle array
const pzArray = [puzzle1, puzzle2, puzzle3];

//classless functions 
function startPuzzle(){
    //selects a random puzzle from the array
    thispuzzle = pzArray[Math.floor(Math.random()*pzArray.length)]; 
    while (thispuzzle.played === true){
        thispuzzle = pzArray[Math.floor(Math.random()*pzArray.length)];
    }; 
    
    playingGame();

};

function playingGame(){
    image.style.visibility = 'visible'
    image.setAttribute('src', thispuzzle.file);
    inputBox.style.visibility = 'visible';
    boxButton.style.visibility = 'visible';
    onlyButton.style.visibility = 'hidden';
    title.style.visibility = 'hidden';
    thispuzzle.bgm.play();
}

function resetGame(){
    image.setAttribute('src', '#')
    onlyButton.style.visibility = 'visible';
    inputBox.style.visibility = 'hidden';
    boxButton.style.visibility = 'hidden';
    title.style.visibility = 'visible';
}


//onclick function for main button. determines if the src attribute of imageA has been assigned yet. if not then it will invoke startPuzzle()
function determineEligibility(){
    if(image.getAttribute('src') === "#"){
        startPuzzle();
    } else {
        return; 
    }
    
}
//function to count the amount of wrong answers input into the box
function countWrong(){     
    var i;
    i++;
        console.log(i);
    }


//checkAnswer function to determine if the correct pass has been entered
function checkAnswer(){
    answer = document.getElementById("inputBox");
    if(answer.value === thispuzzle.pass){
        alert('you win');
        thispuzzle.played = true; 
        //refactor below code into a function 
        resetGame();

    } else {
        hahah.play();
        countWrong();
        return; 
    }

}

//event listeners 

//button to start game
var onlyButton = document.getElementById("onlyButton");
onlyButton.addEventListener('click', determineEligibility);

//button to check answer
var boxButton = document.getElementById("boxButton"); 
boxButton.addEventListener('click', checkAnswer);

