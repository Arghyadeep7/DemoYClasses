const mongoose = require("mongoose");

async function main(){
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_URL}${process.env.DB_URL}`).then(()=>{
        console.log("Connected to MongoDB successfully");
    });
}

main().catch(err=>console.log(err));