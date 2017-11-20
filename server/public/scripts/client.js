console.log('js loaded')

var operationSelected = null;
var numberOne = null;
var numberTwo = null;

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery loaded')
    $('#calculateButton').on('click', calculateAnswer);
    $('.operationButton').on('click', selectOperation);
    $('#clearHistoryButton').on('click', clearHistory);
}


function calculateAnswer() {
    console.log('in calculate button')
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            numberOne: $('#numberOneIn').val(),
            numberTwo: $('#numberTwoIn').val(),
            operation: operationSelected,
        },
        success: function (response) {
            console.log('calculate answer posted')
            getAnswer();
        }
    })
}

function clearHistory() {
    $.ajax({
        method: 'GET',
        url: '/calculate/clear',
        success: function (response) {
            $('#answerDiv').replaceWith('<h2 id="answerDiv"></h2>')
            $('#historyDiv').empty()
            for (var i = 0; i < response.length; i++) {
                currentHistoryItem = response[i];
                $('#historyDiv').append('<li>' + currentHistoryItem.numberOneHistory + ' ' + currentHistoryItem.operationHistory + ' ' + currentHistoryItem.numberTwoHistory + ' = ' + currentHistoryItem.answerHistory + '</li>')
            }
        }
    })
}

function getAnswer() {
    $.ajax({
        method: "GET",
        url: '/calculate/answer',
        success: function (response) {
            console.log(response);
            $('#answerDiv').replaceWith('<h2 id="answerDiv">Answer: ' + response[response.length - 1].answerHistory + '</h2>')
            $('#historyDiv').empty()
            for (var i = 0; i < response.length; i++) {
                currentHistoryItem = response[i];
                $('#historyDiv').append('<li>' + currentHistoryItem.numberOneHistory + ' ' + currentHistoryItem.operationHistory + ' ' + currentHistoryItem.numberTwoHistory + ' = ' + currentHistoryItem.answerHistory + '</li>')
            }

        }
    })
}

function selectOperation() {
    operationSelected = $(this).html()
    console.log('operationSelected is ' + operationSelected)
    $('.operationButton').css('background-color', 'black')
    $(this).css('background-color', 'red')
}

