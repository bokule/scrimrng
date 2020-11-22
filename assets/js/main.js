var name;
var namesArray = [];
//var namesArray = ['a','b','c','d','e','f','g','h','i','j'];

// FIRST STEP

function addName() {
    if(tbName.value != "" && namesArray.length < 10) {
        name = tbName.value.toUpperCase();
        if(isNotDuplicate(name, namesArray)){
            namesArray.push(name);
            tbName.value = '';
        }
    }
    printNames();
    updateNumber();
    enableSubmit();
}

function addNameOnEnter(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
        addName();
    }
}

function printNames() {
    namesList.innerHTML = '';
    for(index in namesArray) {
        var liTag = document.createElement("li");
        //var liContent = document.createTextNode(namesArray[index]);
        //liTag.appendChild(liContent);
        liTag.innerHTML += `<span class="name">${namesArray[index]}</span><button class="btnRemove" id="btnRemove${index}" onClick="removeName(${index});">X</button>`;
        customBg(namesArray[index], liTag);
        namesList.appendChild(liTag);
    }
}

function isNotDuplicate(element, arr) {
    for(index of arr){
        if(index == element){
            return 0;
        }
    }
    return 1;
}

function updateNumber() {
    numberOfNames.textContent = `${namesArray.length}/10`;
}

function enableSubmit() {
    if(namesArray.length == 10) {
        submitButton.addEventListener("click", submit);
    } else {
        submitButton.removeEventListener("click", submit);
    }
}

function submit() {
    if(namesArray.length == 10) {
        firstStep.style.display = "none";
        secondStep.style.display = "block";
        createTeam1();
        createTeam2();
        printTeam1();
        printTeam2();
        removeNext();
    }
}

function reverseSubmit() {
    firstStep.style.display = "block";
    secondStep.style.display = "none";
    addNext();
}

function next() {
    firstStep.style.display = "none";
    secondStep.style.display = "block";
    removeNext();
}

// SECOND STEP

var team1 = [];
var team2 = [];
var roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];


function createTeam1() {
    team1 = [];
    for(let i = 0; i < namesArray.length/2; i++) {
        var randomName = namesArray[rng()];
        if(isNotDuplicate(randomName, team1)) {
            team1.push(randomName);
        } else i--;
    }
}

function createTeam2() {
    team2 = [];
    for(let i = 0; i < namesArray.length/2; i++) {
        var randomName = namesArray[rng()];
        if(isNotDuplicate(randomName, team1) && isNotDuplicate(randomName, team2)) {
            team2.push(randomName);
        } else i--;
    }
}

function rng() {
    return Math.floor(Math.random() * 10);
}

function printTeam1() {
    team1List.innerHTML = "";
    for(index in team1) {
        var teamMember = document.createElement("li");
        //var teamMemberName = document.createTextNode(`${team1[index]} - ${roles[index]}`);
        //teamMember.appendChild(teamMemberName);
        teamMember.innerHTML += `<span class="name">${team1[index]}</span><span>${roles[index]}</span>`;
        customBg(team1[index], teamMember);
        team1List.appendChild(teamMember);
    }
}

function printTeam2() {
    team2List.innerHTML = "";
    for(index in team2) {
        var teamMember = document.createElement("li");
        //var teamMemberName = document.createTextNode(`${team2[index]} - ${roles[index]}`);
        //teamMember.appendChild(teamMemberName);
        teamMember.innerHTML += `<span class="name">${team2[index]}</span><span>${roles[index]}</span>`;
        customBg(team2[index], teamMember);
        team2List.appendChild(teamMember);
    }
}

function removeName(index) {
    namesArray.splice(index, 1);
    printNames();
    updateNumber();
}

function addNext() { // adds 'next' button
    btnNext.style.display = "block";
}

function removeNext() { // removes 'next' button
    btnNext.style.display = "none";
}

// CUSTOM BACKGROUNDS

function customBg(name, element) {
    var customBgNames = ["pinki", "pinky", "cofi", "kofi", "filip", "scutler"];
    var customBgClasses = ["pinki", "pinki", "cofi", "cofi", "cofi", "cofi"];
    for(index in customBgNames) {
        if(name.toUpperCase() == customBgNames[index].toUpperCase()) {
            element.classList.add(customBgClasses[index]);
        }
    }
}