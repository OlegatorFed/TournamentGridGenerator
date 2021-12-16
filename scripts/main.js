var firstRoundTexts = document.getElementsByClassName("name-text");
var teamNames;
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

function SetGrid() {

    SetTeams();
    var numberOfTeams = teamNames.length;
    console.log((numberOfTeams & (numberOfTeams - 1)) == 0);

    if ((numberOfTeams & (numberOfTeams - 1)) == 0) {

        for (var i = 0; i < Math.log2(numberOfTeams); i++) {
            //console.log(numberOfTeams / Math.pow(2, i+1));
            document.getElementById("bracket-area2").innerHTML += '<div class="col" name="round' + i + '"></div>';
            for (var j = 0; j < numberOfTeams / Math.pow(2, i+1); j++){
                console.log(numberOfTeams / Math.pow(2, i+1));
                document.getElementsByName("round"+i)[0].innerHTML += '<div class="game-node"><input type="text" class="name-text" name="name'+ (i*10 + j) +'"> <input type="text" class="name-text" name="name'+ (i*10 + (j+1)) +'"> </div>'
            }
        }
    }
    else {
        console.log("Кол-во команд не является степенью 2")
    }
}