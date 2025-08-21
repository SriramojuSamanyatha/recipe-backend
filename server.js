const express = require('express')
const cors = require("cors")
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'recipe.db')

const app = express()
const port = 3004;
app.use(express.json());
app.use(cors())


let db = null

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    app.listen(3004, () =>
      console.log('Server Running at http://localhost:3004/'),
      
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()


const recipeData = {
    "Contient": "North America",
"Country_State": "US",
"cuisine": "Southern Recipes",
"title": "Sweet Potato Pie",
"URL":"https://www.allrecipes.com/recipe/12142/sweet-potato-pie-i/",
"rating": 4.8,
"total_time": 115,
"prep_time": 15,
"cook_time": 100,
"description": "Shared from a Southern recipe, this homemade sweet potato pie is easy to make with boiled sweet potato. Try it, it may just be the best you've ever tasted!",
"ingredients": [
"1 (1 pound) sweet potato, with skin","0.5 cup butter, softened","1 cup white sugar","0.5 cup milk",
"2 large eggs",
"0.5 teaspoon ground nutmeg",
"0.5 teaspoon ground cinnamon",
"1 teaspoon vanilla extract","1 (9 inch) unbaked pie crust"],
"instructions": ["Place whole sweet potato in pot and cover with water; bring to a boil. Boil until tender when pierced with a fork,40 to 50 minutes.",

"Preheat the oven to 350 degrees F (175 degrees C).",
"Remove sweet potato from the pot and run under cold water. Remove and discard skin.",

"Break sweet potato flesh apart and place in a bowl. Add butter and mix with an electric mixer until well combined. Add sugar, milk, eggs, nutmeg, cinnamon, and vanilla; beat on medium speed until mixture is smooth. Pour filling into unbaked pie crust.", "Bake in the preheated oven until a knife inserted in the center comes out clean, 55 to 60 minutes.", "Remove from the oven and let cool before serving."
],
"nutrients": {
"calories": "389 kcal",
"carbohydrateContent": "48 g",
"cholesterolContent": "78 mg",
"fiberContent": "3 g",
"proteinContent": "5 g",
"saturatedFatContent": "10 g",
"sodiumContent": "254 mg",
"sugarContent": "28 g",
"fatContent": "21 g",
"unsaturatedFatContent": "0 g"
},
"serves": "8 servings"
}

app.get('/api/recipes', async (req, res) => {
  console.log("get")
    const getBooksQuery = `
    SELECT
      *
    FROM
      recipes;`
   
  const booksArray = await db.all(getBooksQuery);
  res.send(booksArray)
});