const express = require('express');
const { append } = require('express/lib/response');
const {MongoClient} = require('mongodb')
const cors = require("cors")
let bodyParser = require('body-parser');


const PORT = process.env.PORT || 8080; 

const app = express()

const uri = "mongodb+srv://armeono:rCrcvpi6Gn3rPwjm@cluster0.ubeit.mongodb.net/TMS?retryWrites=true&w=majority"
const client = new MongoClient(uri)

const connection = client.db('TMS')

app.use(
    cors({
        origin: "http://localhost:4200"
    })
)

app.use(bodyParser.json())

app.listen(PORT, async (err) => { 

    if(err) console.log(err)

    console.log(`Listening on port ${PORT}`)

    try {

        await client.connect();
        console.log("connected")
        
    } catch (error) {

        console.log(error)
        
    }



} )

app.post('/postdata/:collectionName', async (req, res) => { 

    const collectionName = req.params.collectionName

    const task = req.body

    console.log(task)
   
    const result = await connection.collection(collectionName).insertOne(task)

    console.log(`New task created with id: ${result.insertedId}`)

})


app.get('/getdata/:collectionName', async (req, res) => { 

    const collectionName = req.params.collectionName

    const cursor = await connection.collection(collectionName).find()

    const result = await cursor.toArray()

    res.send(result)

    console.log(result)





})

app.delete('/delete/:collectionName/:taskName', async (req, res) => {

    

    const collectionName = req.params.collectionName

    const taskName = req.params.taskName

    console.log(collectionName)

    const result = await connection.collection(collectionName).deleteOne({task: taskName})

    console.log(`${result.deletedCount} deleted`)


})

app.post('/transferdata/:collectionName', async (req, res) => {

    const collectionName = req.params.collectionName

    const task = req.body

    const result = await connection.collection(collectionName).insertOne(task)

    

})
