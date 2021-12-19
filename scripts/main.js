var firstRoundTexts = document.getElementsByClassName("name-text");
var teamNames = [];
console.log(firstRoundTexts);

function SetText() {
    SetTeams();
    for (var i = 0; i < teamNames.length; i++){
        firstRoundTexts[i].value = teamNames[i];
    }
}
function SetTeams() {
    teamNames = document.getElementById("teams-names").value.split('\n');
}

function SetGameNode() {
    //later
}

function SetGrid() {
    Clear();
    SetTeams();
    var numberOfTeams = teamNames.length;
    //console.log((numberOfTeams & (numberOfTeams - 1)) == 0);

    if ((numberOfTeams != 0)&&(numberOfTeams & (numberOfTeams - 1)) == 0) {

        for (var i = 0; i < Math.log2(numberOfTeams); i++) {
            //console.log(numberOfTeams / Math.pow(2, i+1));
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
        console.log("Кол-во команд не является степенью 2")
        document.getElementById("bracket-area2").innerText += "Кол-во команд не является степенью 2";
    }
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
    console.log(element.id.substr(4,element.className.length));
    textFieldNumber = element.id.substr(4,element.className.length);
    console.log(document.getElementById("name" + (Math.floor(textFieldNumber / 100)*100 + 100 + Math.floor(textFieldNumber % 100 / 2))));
    document.getElementById("name" + (Math.floor(textFieldNumber / 100)*100 + 100 + Math.floor(textFieldNumber % 100 / 2))).value = element.value;
}