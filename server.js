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