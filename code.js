var emptyBoxesHTMLElements = document.getElementsByTagName("td");
var emptyBoxesArray = Array.from(emptyBoxesHTMLElements);
emptyBoxesArray.forEach(addEvent);

function addEvent(element, index)
{
    element.addEventListener('click', function(){clicked(element, index)});
};

function clicked(element, index)
{
    if (element.innerHTML == '')
    {
        element.innerHTML = 'X';
        enemyAlg(index);
    }
}

function enemyAlg(currentUserInput)
{
    // Randomly put O on board

    // Check what's on the board, if user won
    // 1Row,2Row,3Row,1Column,2Column,3Column, both diagonals
    var currentUserArray = [];
    var currentEnemyArray = [];

    emptyBoxesArray.forEach(function(element, index){
        if (element.innerHTML == 'X')
        {
            currentUserArray.push(index);
        } else if (element.innerHTML == 'O')
        {
            currentEnemyArray.push(index);
        }
    });
    pickSpot(currentEnemyArray);

    console.log(currentEnemyArray);

    if (currentUserArray.length > 2)
    {
        if (winBool(currentUserArray))
        {
            setTimeout(function() {alert('USER HAS WON')}, 1000);
        } else if (winBool(currentEnemyArray)){
            setTimeout(function() {alert('Enemy HAS WON')}, 1000);
        }
    }
}

function pickSpot(currentEnemyArray)
{
    if (currentEnemyArray.length == 4) {return;}
    while (true)
    {
        var x = Math.floor(Math.random()*8);
        if (emptyBoxesArray[x].innerHTML == '')
        {
            emptyBoxesArray[x].innerHTML = 'O';
            currentEnemyArray.push(x);
            break;
        } else {
            continue;
        }
    }
}

function winBool(checkArray)
{
    var winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    return winArray.some(function(v, i){
        var statement = v.every(x => {
            return checkArray.includes(x)});
        return statement;
    });
}