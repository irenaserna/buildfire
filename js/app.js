//what field user can choose
var availableFields = [[true,true,true],[true,true,true],[true,true,true]];
//number of moves
var counter = 0;
var numberOfRounds = 0;
var playerInitialChoice = null


// draws a simple 3x3 matrix that represents fields for this game, initally fields are disable until user choose a sign to play
function boardDisplay(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var index = i.toString() + j.toString();
            var span = document.createElement('span');
            // on field click function userPlay is called with position of clicked fields
            span.innerHTML = "<input type='button' disabled='true' style='width:100px;height:100px' id='field"+index+"' class='board_buttons' value=' ' onclick='userPlay("+i+","+j+")'>"
            document.getElementById("board").appendChild(span);
        }
        var br = document.createElement("br");
        document.getElementById("board").appendChild(br);
    }
}

// initial user choice, is he going to play with X or O, enable board after choice
function userChoice(sign){
    playerInitialChoice = sign
    document.getElementById('x').disabled = true;
    document.getElementById('o').disabled = true;
    enableAllButtons();
}

// game area is not clickable in the beginning, disable all fields
function disableAllButtons(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var index = i.toString() + j.toString();
            var btn = document.getElementById("field"+index);
            btn.disabled = true;
        }
    }

}

// after initial user choice, enable all fields on the board
function enableAllButtons(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var index = i.toString() + j.toString();
            var btn = document.getElementById("field"+index);
            btn.disabled = false;
        }
    }

}

function userPlay(row,column){
    var index = row.toString() + column.toString();
    var btn = document.getElementById("field"+index);

    btn.value = playerInitialChoice;
    btn.disabled = true;
    availableFields[row][column] = false;
    counter++;

    checkMove(row,column)?winPlayer():''
    counter == 9?draw():''

    computerPlay();
}

// time for computer to choose move
function computerPlay(){
        // randomly choose fields position, choose row and column number from 0..2
        var row = Math.floor(Math.random() * 3);
        var column = Math.floor(Math.random() * 3);
        // check if this field is available
        while(!availableFields[row][column]){
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
        }

        availableFields[row][column] = false;
        var index = row.toString() + column.toString();
        var btn = document.getElementById("field"+index);
        if(playerInitialChoice == 'X'){
            btn.value = "O";
        }else{
            btn.value = "X";
        }
        btn.disabled = true;
        counter++;

        checkMove(row,column)?winComputer(false):''
        counter == 9?draw():''
    }

// player wins
function winPlayer(){
    disableAllButtons();
    var playerWinsNo = document.getElementById("player").innerText;
    playerWinsNo++;
    document.getElementById("player").innerText = playerWinsNo;
    alert("You won!")
    return;
}

// computer wins
function winComputer(){
    disableAllButtons();
    var computerWinsNo = document.getElementById("computer").innerText;
    computerWinsNo++;
    document.getElementById("computer").innerText = computerWinsNo;
    alert("Computer wins!")
    return;
}

// noone wins this time
function draw(){
    var numberOfDraws = document.getElementById("draw").innerText;
    numberOfDraws++;
    document.getElementById("draw").innerText = numberOfDraws;
    alert("Draw!")
    return;
}

function checkMove(row,column){
    values = []; // lets create an array whose index will represent position of clicked element
    for(var i = 0; i < 3; i++){
        var index = row.toString() + i.toString();
        var btn = document.getElementById("field"+index);
        values.push(btn.value);
    }
    // check if row values are the same, if yes player wins
    if(values[0] == values[1] && values[0] == values[2]){
        return true;
    }

    values = []
    for(var i = 0; i < 3; i++){
        var index = i.toString() + column.toString();
        var btn = document.getElementById("field"+index);
        values.push(btn.value);

    }

    if(values[0] == values[1] && values[0] == values[2]){
        return true;
    }

    // game can finish if user matches fields diagonally as well, check these fields
    diagonal_1 = []
    diagonal_2 = []

    if((row == 0 && column == 0) || (row == 0 && column == 2) || (row == 1 && column == 1) || (row == 2 && column == 0) || (row == 2 && column == 2)){
        for(var i = 0; i < 3; i++){
            var index1 = i.toString() + i.toString();
            var btn1 = document.getElementById("field"+index1);
            diagonal_1.push(btn1.value);
            var index2 = i.toString() + (2-i).toString();
            var btn2 = document.getElementById("field"+index2);
            diagonal_2.push(btn2.value);
            
        }   
    }

    if(diagonal_1.length > 0 && diagonal_1[0] != " " && diagonal_1[0] == diagonal_1[1] && diagonal_1[0] == diagonal_1[2]){
        return true;
    }
    if(diagonal_2.length > 0 && diagonal_2[0] != " " && diagonal_2[0] == diagonal_2[1] && diagonal_2[0] == diagonal_2[2]){
        return true;
    }

    return false;
}

function newGame(){
    if(playerInitialChoice == 0){
        return;
    }
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var index = i.toString() + j.toString();
            var btn = document.getElementById("field"+index);
            btn.disabled = false;
            btn.value = " ";
            availableFields[i][j] = true;
        }
    }
    counter = 0; // set counter to 0 for new game     
    numberOfRounds++;
    if(numberOfRounds%2 !=0){ // computer should play first now and then
        computerPlay();
    }
}

// on load function, renders board, initial user choice and few default buttons
function main(){
    boardDisplay();
}


// on load
main()