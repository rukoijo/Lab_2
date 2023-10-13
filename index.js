const PORT = process.env.PORT || 3000; 
const express = require("express");
const connection = require("./connection");
const Recipe = require("./recipe"); 
const app = express();
require("dotenv").config();

connection();
app.use(express.static('public'));
app.use(express.json());

app.get('/recipes', async (req, res) => { 
    try {
        const recipes = await Recipe.find(); 
        console.log("GET RECIPE", recipes);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.post('/recipe', (req, res) => { 
//     const data = new Recipe(req.body); 
//     data.save()
//         .then(recipe => { 
//             console.log('Recipe Added!', recipe);
//             res.json({ success: true, recipe });
//         })
//         .catch(err => console.log(err));
// });

// app.delete('/recipe/:recipeId', async (req, res) => { 
//     try {
//         const recipeId = req.params.recipeId; 
//         const deletedRecipe = await Recipe.findByIdAndDelete(recipeId); 

//         if (!deletedRecipe) {
//             return res.status(404).json({ error: 'Recipe Not found' });
//         }
//         res.json({ success: true, deletedRecipe });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.put('/recipe/:recipeId', async (req, res) => { 
//     try {
//         const recipeId = req.params.recipeId;
//         const updatedData = req.body;

//         const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedData, { new: true });

//         if (!updatedRecipe) {
//             return res.status(404).json({ error: 'Recipe not found' });
//         }

//         res.status(200).json(updatedRecipe);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.get('/', (req, res) => {
    // Send the 'home.html' file as a response
    res.sendFile(__dirname + '/home.html');
  });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

console.log("Listening to the port " + PORT);