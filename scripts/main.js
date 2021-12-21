var firstRoundTexts = document.getElementsByClassName("name-text");
var teamNames = [];
var scores = {};
var scoreTable = document.getElementById("score-table");

UpdateTeams();
ScoreInit();


function ScoreInit() {
    teamNames.forEach((item) => {
        if (typeof scores[item] === 'undefined'){
            scores[item] = {
                games: 0,
                wins: 0,
                losses: 0,
                score: 0
            };
        }
    })
}
 function SortScores() {
    for (var i = 0; i < teamNames.length; i++){
        for (var j = i+1; j < teamNames.length; j++){
            if (scores[teamNames[i]].wins <= scores[teamNames[j]].wins){
                [teamNames[i], teamNames[j]] = [teamNames[j], teamNames[i]];
            }
        }
    }
 }

function SetText() {
    SetTeams();
    for (var i = 0; i < teamNames.length; i++){
        firstRoundTexts[i].value = teamNames[i];
    }
}
function SetTeams() {
    teamsText = document.getElementById("teams-names").value;
    teamNames = teamsText.split('\n').filter(item => item);
    scores = {};
    ScoreInit();
    //console.log(teamNames);
}



function SetGameNode() {
    //later
}

function SetGrid() {
    Clear();
    SetTeams();
    var numberOfTeams = teamNames.length;
    SetTable(numberOfTeams);
    //console.log((numberOfTeams & (numberOfTeams - 1)) == 0);

    if ((numberOfTeams != 0)&&(numberOfTeams & (numberOfTeams - 1)) == 0) {

        for (var i = 0; i < Math.log2(numberOfTeams); i++) {

            document.getElementById("bracket-area2").innerHTML += '<div class="col" name="round' + i + '"></div>';
            document.getElementById("bracket-area2").innerHTML += '<div class="con-col-'+ i +'"></div>';

            for (var j = 0; j < Math.floor(numberOfTeams / Math.pow(2, i+2)); j++){
                document.getElementsByClassName("con-col-" + i)[0].innerHTML += '<div class="connector"></div>';
            }
            for (var j = 0; j < numberOfTeams / Math.pow(2, i+1); j++){
                document.getElementsByName("round"+i)[0].innerHTML += '<div class="game-node"><input type="text" readonly class="name-text" id="name'+ (i*100 + 2*j) +'" onclick="DecideTheWinner(this)"> <input type="text" readonly class="name-text" id="name'+ (i*100 + 2*j+1) +'" onclick="DecideTheWinner(this)"> </div>';
            }
        }
        for (var j = 0; j < numberOfTeams / 2; j++){
            //console.log(numberOfTeams / Math.pow(2, i+1));
            //document.getElementsByName("round"+i)[0].innerHTML += '<div class="game-node"><input type="text" class="name-text" id="name'+ (i*100 + 2*j) +'"> <input type="text" class="name-text" id="name'+ (i*100 + 2*j+1) +'"> </div>';
            //console.log(2*j, 2*j+1);
            var elementsToFill1 = document.getElementById("name"+(2*j));
            var elementsToFill2 = document.getElementById("name"+(2*j+1));
            //console.log(document.getElementById("name"+(2*j)));
            elementsToFill1.value = teamNames[j];
            elementsToFill2.value = teamNames[teamNames.length-j-1];
        }
    }
    else {
        // nearestPower = Math.pow(2,Math.floor(Math.log(numberOfTeams)/Math.log(2)));
        // console.log(nearestPower, Math.log2(numberOfTeams));
        document.getElementById("bracket-area2").innerText += "Кол-во команд не является степенью 2";

        // for (var i = 0; i < Math.log2(numberOfTeams); i++) {
        //
        //     document.getElementById("bracket-area2").innerHTML += '<div class="col" name="round' + i + '"></div>';
        //     document.getElementById("bracket-area2").innerHTML += '<div class="con-col-'+ i +'"></div>';
        //
        //     for (var j = 0; j < Math.floor(nearestPower*2 / Math.pow(2, i+2)); j++){
        //         document.getElementsByClassName("con-col-" + i)[0].innerHTML += '<div class="connector"></div>';
        //     }
        //     for (var j = 0; j < numberOfTeams / Math.pow(2, i+1); j++){
        //         document.getElementsByName("round"+i)[0].innerHTML += '<div class="game-node"><input type="text" readonly class="name-text" id="name'+ (i*100 + 2*j) +'" onclick="DecideTheWinner(this)"> <input type="text" readonly class="name-text" id="name'+ (i*100 + 2*j+1) +'" onclick="DecideTheWinner(this)"> </div>';
        //     }
        // }
    }
}



function SetTable(numOfTeams) {
    scoreTable.innerHTML += '<tr><td>Team</td><td>Games</td><td>Wins</td><td>Losses</td><td>Total Score</td></tr>'
    for (var k = 0; k < numOfTeams; k++) {
        scoreTable.innerHTML += '<tr id="'+ teamNames[k] +'-score">'+ SetTableRow(teamNames[k], scores[teamNames[k]].games, scores[teamNames[k]].wins, scores[teamNames[k]].losses, scores[teamNames[k]].score) +'</tr>';
    }

}

function UpdateTable() {
    scoreTable.innerHTML = '';
    SetTable(teamNames.length);
}

function SetTableRow(name, games, wins, losses, totalScore){
    return '<td>'+ name +'</td><td>'+ games +'</td><td>'+ wins +'</td><td>'+ losses +'</td><td>'+ totalScore +'</td>';
}


function Clear() {
    document.getElementById("bracket-area2").innerHTML = "";
    teamNames = [];
}

function UpdateTeams() {
    SetTeams();
    document.getElementById("teams-counter").innerText = "Number of teams: " + teamNames.length;
}

function DecideTheWinner(element) {
    teamName = element.value;
    console.log(teamName);
    textFieldNumber = element.id.substr(4,element.className.length);
    console.log((textFieldNumber % 2 == 0) ? "name" + (parseInt(textFieldNumber)+1) : "name" + (parseInt(textFieldNumber) - 1));
    loserElement = (textFieldNumber % 2 == 0) ? document.getElementById("name" + (parseInt(textFieldNumber) + 1)) : document.getElementById("name" + (parseInt(textFieldNumber) - 1));
    loserName = loserElement.value;

    scores[teamName].games++;
    scores[teamName].wins++;

    scores[loserName].games++;
    scores[loserName].losses++;

    SortScores();

    loserElement.setAttribute("disabled", "disabled");
    element.setAttribute("disabled", "disabled");
    UpdateTable();
    document.getElementById("name" + (Math.floor(textFieldNumber / 100)*100 + 100 + Math.floor(textFieldNumber % 100 / 2))).value = element.value;
}