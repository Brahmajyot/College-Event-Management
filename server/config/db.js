import mongoose from "mongoose";

const connectDB = async ()=>{

    try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log(`connection susefully in database ${conn.connection.host}`)


    } catch (error) {
        console.log(`not connected : ${error}`)
        process.exit(1);
    }

}


export default connectDB;