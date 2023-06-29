require("dotenv").config()
const Library = require("./Library")
const DB_URL = process.env.DB_URL

const collection = new Library(DB_URL, "library", "books")


async function render() {

    collection.removeBook("649b2ef92a8089f2e61e8d29")
}

render()