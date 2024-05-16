import { MongoClient,ServerApiVersion,ObjectId } from "mongodb";
import 'dotenv/config';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

// Test Ping with the Db - Could be 1 db for 1 Microservice
async function testPing() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
testPing().catch(console.dir);

async function getQuizQuestions() {
    try{
        await client.connect();
        const coll = client.db(process.env.DB_NAM).collection(process.env.CL_QUZ);
        const result = await coll.find({}).toArray();
        return result;
    }catch(err){
        console.log("Error in getQuizQuestions db :",err);
        return null;
    } finally{
        await client.close()
    }
}

async function getQuestion(_id){
    try {
        await client.connect();
        const coll = client.db(process.env.DB_NAM).collection(process.env.CL_QUZ);
        const objId = new ObjectId(_id);
        const result = await coll.findOne({"_id":objId});
        console.log("Result ",result);
        return result;
    } catch (err) {
        console.log("Error in getQuestion Db : ",err);
        return null;
    }finally{
        await client.close();
    }
}

export default {
    getQuizQuestions,
    getQuestion,
};