var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id":"232kAk",
        "text":"Eggs"
    },
    {
        "id":"dkP345",
        "text":"Bacon"
    },
    {
        "id":"da3F45",
        "text":"Milk"
    }
];

app.get('/', function(request, response) {
    response.send(ingredients);
});

app.get('/ingredients', function(request, response) {
    var ingredient = request.body;
    if (!ingredient || ingredient.text === "") {
        response.status(500).send({error: "Your ingredient must have text"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});

app.put('/ingredients/:ingredientId', function(request, response) {
    var ingredientId = request.params.ingredientId;
    var newText = request.body.text;

    if ((!ingredientId || ingredientId === "") || (!newText || newText === "")) {
        response.status(500).send({error:"You must provide ingredient text"});
    } else {
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];

            if (ing.id === request.params.ingredientId) {
                ingredients[x].text = newText;
            }
        }

        response.send(ingredients);
    }
});

app.get('/funions', function(req, res) {
    res.send('Give me some funions');
});

app.listen(3000, function() {
    console.log("First API runnin on port 3000");
});