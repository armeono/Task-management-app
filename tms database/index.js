const express = require('express');
const { append } = require('express/lib/response');
const {MongoClient} = require('mongodb')


const PORT = process.env.PORT || 8080; 

const app = express()

const uri = "mongodb+srv://armeono:rCrcvpi6Gn3rPwjm@cluster0.ubeit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)

let sampleTask = {
    task: "Go get groceries + salad",
    date: new Date()
}

const connection = client.db('tm_system').collection('Tasks')

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

app.post('/post', async (req, res) => { 
   
    const result = await connection.insertOne(sampleTask)

    console.log(`New task created with id: ${result.insertedId}`)

})


app.get('/get', async (req, res) => { 

    const cursor = await connection.find()

    const result = await cursor.toArray()

    res.send(result)

    console.log(result)





})

app.delete('/delete/:taskName', async (req, res) => {

    const taskName = req.params.taskName


    const result = await connection.deleteOne({task: taskName})

    console.log(`${result.deletedCount} deleted`)


})
