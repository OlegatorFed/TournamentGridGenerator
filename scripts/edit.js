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

function UpdateTable() {
    scoreTable.innerHTML = '';
    SetTable(teamNames.length);
}

function SetTeams() {
    teamsText = document.getElementById("teams-names").value;
    teamNames = teamsText.split('\n').filter(item => item);
    scores = {};
    ScoreInit();
}

function DecideTheWinner(element) {
    textFieldNumber = element.id.substr(4,element.className.length);
    teamName = element.value;
    loserElement = (textFieldNumber % 2 == 0) ? document.getElementById("name" + (parseInt(textFieldNumber) + 1)) : document.getElementById("name" + (parseInt(textFieldNumber) - 1));
    console.log(Math.ceil(Math.log2(teamNames.length)) - 1, Math.floor(textFieldNumber / 100));

    if (mode && Math.ceil(Math.log2(teamNames.length)) - 1 != Math.floor(textFieldNumber / 100)){

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
    else if (Math.ceil(Math.log2(teamNames.length)) - 1 == Math.floor(textFieldNumber / 100)) {
        document.getElementById("winner").innerText = teamName;

        loserElement.setAttribute("disabled", "disabled");
        element.setAttribute("disabled", "disabled");
    }

}

function UpdateMode() {
    tourMode = document.getElementById("tour-mode").checked;
    editMode = document.getElementById("edit-mode").checked;
    mode = !editMode;
    console.log(document.getElementById("bracket-area2").innerHTML === '');
    if (editMode){
        if (document.getElementById("bracket-area2").innerHTML !== ''){
            Clear();
            SetGrid();
        }
        document.getElementById("generate-btn").disabled = false;
        document.getElementById("clear-btn").disabled = false;
    }
    else {
        document.getElementById("generate-btn").disabled = true;
        document.getElementById("clear-btn").disabled = true;
    }
    console.log(tourMode, editMode);
}

function Clear() {
    document.getElementById("bracket-area2").innerHTML = "";
    document.getElementById("score-table").innerHTML = "";
    teamNames = [];
}

function UpdateTeamsNumber() {
    SetTeams();
    document.getElementById("teams-counter").innerText = "Number of teams: " + teamNames.length;
}