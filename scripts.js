const solveSudokuButton = document.getElementById('solve-sudoku');
const clearBoardButton = document.getElementById('clear-board');

let request = '';
let xmlHttpResponse;

function buildRequest() {
    request = '';

    document.getElementsByName('quantity').forEach(input => {
        if (input.value.toString() !== "") {
            request = request.concat(input.id.toString(), input.value.toString());
        }

    });
    console.log(request);
    xmlHttpResponse = httpGet('http://localhost:8080/v1/sudoku/' + request);
    responseIterate();
};

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.response;
}

function responseIterate() {
    let json = JSON.parse(xmlHttpResponse);
    for (var i = 0; i < json.sudokuRowDtoList.length; i++) {
        for (var j = 0; j < json.sudokuRowDtoList[i].sudokuElementDtoList.length; j++) {
            console.log("Row and Col: " + i.toString() + j.toString() + "Value: " + json.sudokuRowDtoList[i].sudokuElementDtoList[j].value.toString());
            document.getElementById((i + 1).toString() + (j + 1).toString()).value = json.sudokuRowDtoList[i].sudokuElementDtoList[j].value;
        }
    }
}

function clearBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            document.getElementById(i.toString() + j.toString()).value = "";
        }
    }
}

solveSudokuButton.onclick = function () { buildRequest() };
clearBoardButton.onclick = function () { clearBoard() };