//define constants from html 
var image = document.getElementById("imageA");
var inputBox = document.getElementById("inputBox");
var boxButton = document.getElementById("boxButton");
var onlyButton = document.getElementById("onlyButton");
var title = document.getElementById("title");
var points = document.getElementById("pointsDiv");
var warning = document.getElementById("warning");
var score = 0;
var scoreDisplay = document.getElementById("scoreDiv");



//define audio constants to call inside of the objects.
var hahah = new Audio('SE/ahaha.wav');
var cicadas = new Audio("SE/cicadas.ogg");
var ds1 = new Audio("SE/deathsounds/died1.ogg");
var ds2 = new Audio("SE/deathsounds/died2.ogg");
var ds3 = new Audio("SE/deathsounds/died3.ogg");
var ds4 = new Audio("SE/deathsounds/died4.ogg");
var apathy = new Audio("BGM/apathy.ogg");
var rChanger = new Audio("BGM/rhythm-changer.ogg");
var chips = new Audio("BGM/chips.mp3");
var duvide = new Audio("BGM/duvide.mp3");
var rain = new Audio("SE/rain.ogg");
var victory = new Audio("BGM/nighteye.ogg")
//audio loop definitions 
cicadas.loop=true;
apathy.loop=true;
rChanger.loop=true; 
chips.loop=true;
duvide.loop=true;
rain.loop=true; 


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
const puzzle2 = new Puzzle('https://i.imgur.com/NqkqByd.jpg', '682', rChanger);
const puzzle3 = new Puzzle('https://i.imgur.com/3PBJQOy.jpg', '137', apathy);
const puzzle4 = new Puzzle('https://i.imgur.com/TGDbNxI.jpg', '18450911',chips );
const puzzle5 = new Puzzle('https://i.imgur.com/p2Ny5Wb.jpg','017',duvide)

//puzzle array
const pzArray = [puzzle5, puzzle4, puzzle3, puzzle2, puzzle1];
const dSounds = [ds1, ds2, ds3, ds4];

//classless functions 
function startPuzzle(){
    //selects a random puzzle from the array
    // thispuzzle = pzArray[Math.floor(Math.random()*pzArray.length)]; 
    // if (thispuzzle.played === true){
    //     thispuzzle = pzArray[Math.floor(Math.random()*pzArray.length)];

    // } else if (thispuzzle.played === true){ startPuzzle();

    // }
    for(i in pzArray){
        thispuzzle = pzArray[i];
        
    }
    
   
    playingGame();
    

}

function setPoints(){
    pointsTotal = 50;
    points.innerHTML = pointsTotal; 
    
   
}

function deductPoints(){
    pointsTotal = pointsTotal - 5; 
    points.innerHTML = pointsTotal; 
}

function addPoints(){
    pointsTotal = pointsTotal + 15;
    points.innerHTML = pointsTotal;
}

function setScore(){
    scoreDisplay.innerHTML = score; 
}

function addScore(){
    score = score + 1;
    scoreDisplay.innerHTML = score; 
}
function checkScore(){
    if(score === 5){
        image.setAttribute('src', 'https://i.imgur.com/TcjuaVA.jpg');
        victory.play();
        
    } else {
        return; 
    }
}

function playingGame(){
    image.style.visibility = 'visible'
    image.setAttribute('src', thispuzzle.file);
    inputBox.style.visibility = 'visible';
    boxButton.style.visibility = 'visible';
    onlyButton.style.visibility = 'hidden';
    title.style.visibility = 'hidden';
    warning.style.visibility = 'hidden';
    rain.pause();
    thispuzzle.bgm.play();
}

function resetGame(){
    image.setAttribute('src' , '#');
    onlyButton.style.visibility = 'visible';
    inputBox.style.visibility = 'hidden';
    boxButton.style.visibility = 'hidden';
    title.style.visibility = 'visible';
    image.style.visibility = 'hidden';
    thispuzzle.bgm.pause();
    
}

function punish(){
    image.setAttribute('src', 'https://i.imgur.com/fe3sok0.jpg');
    thispuzzle.bgm.pause();
    //sound.play();
}


//onclick function for main button. determines if the src attribute of imageA has been assigned yet. if not then it will invoke startPuzzle()
function determineEligibility(){
    if(image.getAttribute('src') === "#"){
        startPuzzle();
        checkScore();
    } else {
        return; 
    }   
}
//checkAnswer function to determine if the correct pass has been entered
function checkAnswer(){
    answer = document.getElementById("inputBox");
    if(answer.value === thispuzzle.pass){
        //image.setAttribute('src', 'https://i.imgur.com/TcjuaVA.jpg');
        thispuzzle.played = true; 
        //refactor below code into a function 
        resetGame();
        addScore();
        pzArray.pop();
        

    } else if(pointsTotal === 0){
        punish();
        var dSound = dSounds[Math.floor(Math.random() * dSounds.length)];
        dSound.play();
        
    
    } else {
        hahah.play();
        deductPoints();
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

//initial function calls
setPoints(); 
setScore();


//icloud ate all the files had to reupload
