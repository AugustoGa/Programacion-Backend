const mongoose = require('mongoose');

const mongoConnect = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://admin:admin@coderhouse.hjzxpio.mongodb.net/MiDBcoder?retryWrites=true&w=majority')
        console.log(' Connected to DB "MongoDB"');
    } catch (error) {
        console.error( 'Error Connected', error )
    }
    
}
module.exports = mongoConnect;