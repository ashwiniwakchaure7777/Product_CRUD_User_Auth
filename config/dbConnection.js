import mongoose from "mongoose";


const dbConnection = () => { 
    mongoose.connect(process.env.MONGO_URL, {dbName:"PRODUCT"})
    .then(()=>{
        console.log("Database connection established")
    })
    .catch((error)=>{
        console.log("Database connection issue",error);
    })
}

export default dbConnection;