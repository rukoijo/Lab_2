const PORT = process.env.PORT || 3000; 
const express = require("express");
const connection = require("./connection");
const Recipe = require("./recipe"); 
const app = express();
exports.app = app;
require("dotenv").config();

connection();
app.use(express.static('public'));
app.use(express.json());

//this fetches all the recipes from the database
app.get('/recipes', async (req, res) => { 
    try {
        const recipes = await Recipe.find(); 
        console.log("GET RECIPE", recipes);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//this fetches a specific recipe from the database based on the recipe id
app.get('/recipes/:recipeId', async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const recipe = await Recipe.findById(recipeId);
        console.log("GET RECIPE", recipe);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//this adds a recipe to the database
app.post('/recipes', (req, res) => { 
    const data = new Recipe(req.body); 
    data.save()
        .then(recipe => { 
            console.log('Recipe Added!', recipe);
            res.json({ success: true, recipe });
        })
        .catch(err => console.log(err));
});

//this updates a recipe in the database based on the recipe id
app.put('/recipes/:recipeId', async (req, res) => { 
    try {
        const recipeId = req.params.recipeId;
        const updatedData = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedData, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sends the 'home.html' file as a default response to a call to the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
  });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

console.log("Listening to the port " + PORT);