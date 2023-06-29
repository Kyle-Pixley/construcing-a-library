const { MongoClient, ObjectId } = require("mongodb")


class Library {
    constructor(dbUrl, dbName, collName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.collName = collName;
    this.dbClient;
    }

    async client() {
        console.log(`Connecting to ${this.dbUrl}...`)
        this.dbClient = MongoClient.connect(this.dbUrl)
        console.log(`Connection successful`)
        return this.dbClient
    }
    async test() {
        const client = await this.client()
        client.close()
    }
    async collection() {
        const client = await this.client();
        const db = client.db(this.dbName);
        const collection = db.collection(this.collName);
        return collection;
    }
    async allBooks() {
        const collection = await this.collection();
        return collection.find({}).toArray();
    }
    async findOneBook(id) {
        const docId = new ObjectId(id);
        const collection = await this.collection();
        return collection.find(docId);
    }
    async findManyBooks(query) {
        const collection = await this.collection();
        return collection.find(query).toArray();
    }
    async addBook(info) {
        const collection = await this.collection();
        await collection.insertOne(info)
        console.log(`Book Added`)
    }
    async changeBook (id,newInfo) {
        const mongoId = new ObjectId(id)
        const collection = await this.collection();
        const infoObj = { $set: newInfo };
        await collection.updateOne( { _id: mongoId},infoObj)
        console.log(`Book (${id}) updated`)
    }
    async removeBook(id) {
        const mongoId = new ObjectId(id)
        const collection = await this.collection()
        const result = await collection.deleteOne({ _id: mongoId })
        if (result.deletedCount === 0) return "Nothing to delete"
    }
};



module.exports = Library;