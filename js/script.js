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
var timer = document.getElementById("timer");



//define audio constants to call inside of the objects.
var hahah = new Audio('SE/ahaha.wav');
var cicadas = new Audio("SE/cicadas.ogg");
var urgency = new Audio("SE/schoolbell.wav");
var ds1 = new Audio("SE/deathsounds/died1.ogg");
var ds2 = new Audio("SE/deathsounds/died2.ogg");
var ds3 = new Audio("SE/deathsounds/died3.ogg");
var ds4 = new Audio("SE/deathsounds/died4.ogg");
var rChanger = new Audio("BGM/rhythm-changer.ogg");
var chips = new Audio("BGM/chips.mp3");
var duvide = new Audio("BGM/duvide.mp3");
var rain = new Audio("SE/rain.ogg");
var victory = new Audio("BGM/nighteye.ogg")
var ay = new Audio("BGM/ay.ogg");
var hurry = new Audio("SE/ominouschello.ogg")
//audio loop definitions 
cicadas.loop=true;
ay.loop=true;
rChanger.loop=true; 
chips.loop=true;
duvide.loop=true;
rain.loop=true; 

//regular constants 
hMode = false; 

//puzzles - please dont spoil it for yourself. 
class Puzzle{
    constructor(file, pass, bgm, story){ 
    this.file = file;
    this.pass = pass;
    this.played = false; 
    this.bgm = bgm;
    this.time = 600; 
    this.story = story; 
    }
 
    //reset page function, decided to bake into puzzle class to avoid
    //repetition
    reset(){
        location.reload(true);
    }
};

//define puzzle objects from class 
const puzzle1 = new Puzzle('https://i.imgur.com/j0UMwfZ.jpg', '19140728', cicadas, "The call was short the blow severe, I little know that death was near, Only those who have lost are able to tell, The pain that I felt at not saying farewell");
const puzzle2 = new Puzzle('https://i.imgur.com/NqkqByd.jpg', '682', rChanger, "First Occurrence, ██-██-████: Handled by Agent ███████, Agent ███, Agent ████████ (KIA), Personnel D-129 (KIA), Personnel D-027 (KIA), Personnel D-173 (KIA), Personnel D-200 (KIA), Personnel D-193 (KIA)");
const puzzle3 = new Puzzle('https://i.imgur.com/3PBJQOy.jpg', '137', ay, "Why does nature insist on this number?");
const puzzle4 = new Puzzle('https://i.imgur.com/TGDbNxI.jpg', '18450911',chips, "Many people use bit rate per second (bps) and baud rate interchangeably, which is not correct. The bps is defined as the number of binary bits transmitted per second, while Baud rate is defined as the number of signal elements or states transmitted per second." );
const puzzle5 = new Puzzle('https://i.imgur.com/p2Ny5Wb.jpg','017',duvide, "SCP-017's reaction to shadows cast upon it is immediate and swift. SCP-017 leaps at the object casting the shadow and completely encloses it in its shroud, whereupon it returns to its normal size, leaving no trace of the object behind.")

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
//timer and functions related to timer, nested inside of the set interval code. 
function timers(){
var sec = thispuzzle.time;
if (thispuzzle.played === false){
    let int = setInterval(() => {
    timerCountDown();
    if(sec <= 0 && pointsTotal >= 0){
        deductPoints();
        urgency.pause();
        hurry.pause();
        hahah.play();

    };
    if(pointsTotal === 0){
        punish();
        var dSound = dSounds[Math.floor(Math.random() * dSounds.length)];
        dSound.play();
    };
    if(sec === 160){
        thispuzzle.bgm.pause();
        hurry.play();
    }
    
    if(sec === 30){
        urgency.play();

    };
    if(image.style.visibility === 'hidden'){
        console.log(int)
        return clearInterval(int);
        };
    }, 1000)

function timerCountDown(int){
    timer.innerHTML = "Time Left: " + sec + " seconds."; 
    sec --; 
    return sec; 
    }
    

}

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
    storyP.innerHTML = '';
    image.style.visibility = 'visible'
    image.setAttribute('src', thispuzzle.file);
    inputBox.style.visibility = 'visible';
    boxButton.style.visibility = 'visible';
    onlyButton.style.visibility = 'hidden';
    hModeButton.style.visibility = 'hidden';
    title.style.visibility = 'hidden';
    warning.style.visibility = 'hidden';
    rain.pause();
    thispuzzle.bgm.play();
    
}
function hardMode(){
    hMode = true; 
    determineEligibility();
    timers();
}

function resetGame(){
    image.setAttribute('src' , '#');
    if (hMode === true){
        onlyButton.style.visibility = 'hidden';
        hModeButton.style.visibility = 'visible';
    }
    if(hMode === false){
        hModeButton.style.visibility = 'hidden';
        timer.style.visibility = 'hidden';
        onlyButton.style.visibility = 'visible';
    };
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
        storyP.innerHTML = thispuzzle.story;
        //refactor below code into a function 
        resetGame();
        addScore();
        pzArray.pop();
        inputBox.value = '';
        

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
var storyP = document.getElementById('storyP')
//button to start game
var onlyButton = document.getElementById("onlyButton");
onlyButton.addEventListener('click', determineEligibility);

//button to check answer
var boxButton = document.getElementById("boxButton"); 
boxButton.addEventListener('click', checkAnswer);
inputBox.addEventListener('keyup',function(e){
    if(e.keyCode === 13){
        checkAnswer();
    }
});

//hard mode button
var hModeButton = document.getElementById("hardModeButton");
hModeButton.addEventListener('click', hardMode);

//initial function calls
setPoints(); 
setScore();
//icloud ate all the files had to reupload
