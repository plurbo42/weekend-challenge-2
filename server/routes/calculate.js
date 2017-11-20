var express = require('express');
var router = express.Router();
var history = [];

router.post('/', function(req, res){
    var historyItem = {
        numberOneHistory: req.body.numberOne,
        numberTwoHistory: req.body.numberTwo,
        operationHistory: req.body.operation,
        answerHistory: null
    }
    if(req.body.operation == '+'){
        answer = Number(req.body.numberOne) + Number(req.body.numberTwo)
    }else if(req.body.operation == '-'){
        answer = req.body.numberOne - req.body.numberTwo
    }else if(req.body.operation == 'x'){
        answer = req.body.numberOne * req.body.numberTwo
    }else if(req.body.operation == '/'){
        answer = req.body.numberOne / req.body.numberTwo
    }
    historyItem.answerHistory = answer
    history.push(historyItem);
    console.log(history)
    console.log(req.body, ' and the answer is ', answer)
    res.sendStatus(200);
})

router.get('/answer', function(req, res){
    res.send(history);
})

router.get('/clear', function(req, res){
    history = [];
    res.send(history);
})


module.exports = router