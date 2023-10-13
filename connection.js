const mongoose = require("mongoose")

const url = process.env.DATABASE_URL || "mongodb+srv://amanirukoijo:Canada2017@cluster0.hmk7fpy.mongodb.net/recipe2"

async function main(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const mgDB = mongoose.connection;
    console.log("DATABASE_URL = ", url)
    mgDB.on('connected', console.log.bind(console, 'MongoDB & Mongoose Connected'));
    
}

module.exports=main